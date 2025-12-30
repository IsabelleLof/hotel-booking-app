import { NextRequest, NextResponse } from "next/server";
import Amadeus from "amadeus";
import { MOCK_HOTELS } from "@/lib/mockData";

// Amadeus SDK requires Node runtime
export const runtime = "nodejs";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

function toYMD(value: string | null) {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Next 16.1: params kan vara en Promise
) {
  const { id } = await params; // ✅ unwrap params

  // Fallback to mock if no keys
  if (
    !process.env.AMADEUS_CLIENT_ID ||
    process.env.AMADEUS_CLIENT_ID === "REPLACE_WITH_YOUR_KEY"
  ) {
    const hotel = MOCK_HOTELS.find((h) => h.id === id);
    return NextResponse.json(hotel ?? null, { status: hotel ? 200 : 404 });
  }

  try {
    // Läs optional query params (om du vill skicka datum/guests från UI)
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

    const hotel = hotelOffer.hotel;
    const firstOffer = hotelOffer.offers?.[0];

    const hotelData = {
      id: hotel.hotelId,
      name: hotel.name || "Hotel",
      location: {
        city: hotel.cityCode || "",
        country: hotel.address?.countryCode || "",
        address: hotel.address?.lines?.join(", ") || "",
        latitude: hotel.latitude || 0,
        longitude: hotel.longitude || 0,
      },
      description:
        hotel.description?.text ||
        firstOffer?.room?.description?.text ||
        "No description available",
      rating: 4, // Amadeus doesn't provide ratings in this endpoint
      pricePerNight: firstOffer?.price?.total ? parseFloat(firstOffer.price.total) : 0,
      amenities: hotel.amenities || ["WiFi", "Air Conditioning"],
      image:
        hotel.media?.[0]?.uri ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
      available: hotelOffer.available ?? true,
    };

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

