import { NextRequest, NextResponse } from "next/server";
import Amadeus from "amadeus";
import { MOCK_HOTELS } from "@/lib/mockData";
import { mapAmadeusToHotel } from "@/lib/mappers";

// Amadeus SDK requires Node runtime
export const runtime = "nodejs";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

//Regex?

function toYMD(value: string | null) {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Fallback to mock if no keys
  if (
    !process.env.AMADEUS_CLIENT_ID ||
    process.env.AMADEUS_CLIENT_ID === "REPLACE_WITH_YOUR_KEY"
  ) {
    const hotel = MOCK_HOTELS.find((h) => h.id === id);
    return NextResponse.json(hotel ?? null, { status: hotel ? 200 : 404 });
  }

  try {
    const adults = request.nextUrl.searchParams.get("adults") ?? "2";
    const checkInDate = toYMD(request.nextUrl.searchParams.get("checkIn"));
    const checkOutDate = toYMD(request.nextUrl.searchParams.get("checkOut"));

    // Use hotelOffersSearch with single hotelId (v3)
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: id,
      adults,
      ...(checkInDate ? { checkInDate } : {}),
      ...(checkOutDate ? { checkOutDate } : {}),
    });

    const hotelOffer = response.data?.[0];
    if (!hotelOffer) return NextResponse.json(null, { status: 404 });

    // Transform Amadeus response to Hotel interface using shared mapper
    const hotelData = mapAmadeusToHotel(hotelOffer);

    return NextResponse.json(hotelData, { status: 200 });
  } catch (error: any) {
    const status = error?.response?.statusCode || error?.response?.status || 500;
    const raw =
      error?.response?.data ??
      error?.response?.body ??
      error?.message ??
      error;
    const details = typeof raw === "string" ? raw : JSON.stringify(raw, null, 2);

    console.error("Amadeus API Error:", status, details);

    return NextResponse.json(
      { error: "Failed to fetch hotel", status, details },
      { status }
    );
  }
}
