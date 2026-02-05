import { NextResponse } from "next/server";
import Amadeus from "amadeus";
import { mapAmadeusToHotel } from "@/lib/mappers";

// ✅ Viktigt: Amadeus SDK behöver Node runtime (inte Edge)
export const runtime = "nodejs";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID!,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET!,
});

//regex

function toYMD(value: string | null) {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value; // redan YYYY-MM-DD
  const d = new Date(value); // ISO -> Date
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q") ?? "";
    const adults = Number(searchParams.get("adults") ?? "2");

    // UI skickar ofta checkIn/checkOut (ibland ISO), vi normaliserar till YYYY-MM-DD
    const checkInDate = toYMD(searchParams.get("checkIn"));
    const checkOutDate = toYMD(searchParams.get("checkOut"));

    if (!query) return NextResponse.json([], { status: 200 });

    // ✅ Guards: ger tydliga fel om SDK-versionen saknar metoder
    if (!amadeus.referenceData?.locations?.cities?.get) {
      throw new Error("SDK saknar referenceData.locations.cities.get (fel amadeus-version?)");
    }
    if (!amadeus.referenceData?.locations?.hotels?.byCity?.get) {
      throw new Error("SDK saknar referenceData.locations.hotels.byCity.get");
    }
    if (!amadeus.shopping?.hotelOffersSearch?.get) {
      throw new Error("SDK saknar shopping.hotelOffersSearch.get");
    }

    // 1) City lookup -> cityCode (IATA)
    const locationResponse = await amadeus.referenceData.locations.cities.get({
      keyword: query,
    });

    const cityCode =
      locationResponse.data?.[0]?.iataCode ??
      locationResponse.data?.[0]?.address?.cityCode;

    if (!cityCode) return NextResponse.json([], { status: 200 });

    // 2) Hotel list by city -> hotelIds
    const list = await amadeus.referenceData.locations.hotels.byCity.get({ cityCode });

    const hotelIds = (list.data ?? [])
      .slice(0, 25)
      .map((h: any) => h.hotelId)
      .join(",");

    if (!hotelIds) return NextResponse.json([], { status: 200 });

    // 3) Offers (skicka datum om vi har dem)
    const offers = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      adults,
      ...(checkInDate ? { checkInDate } : {}),
      ...(checkOutDate ? { checkOutDate } : {}),
    });

    // Transform Amadeus response to Hotel interface using shared mapper
    const hotels = (offers.data ?? []).map(mapAmadeusToHotel);

    return NextResponse.json(hotels, { status: 200 });
  } catch (err: any) {
    const status =
      err?.response?.statusCode ||
      err?.response?.status ||
      500;

    if (err instanceof Error) {
      console.error("Amadeus error status:", status);
      console.error("Amadeus error message:", err.message);
      return NextResponse.json(
        { message: "Amadeus error", status, details: err.message },
        { status }
      );
    }

    const raw =
      err?.response?.data ??
      err?.response?.body ??
      err?.response?.result ??
      err?.description ??
      err;

    const details = typeof raw === "string" ? raw : JSON.stringify(raw, null, 2);

    console.error("Amadeus error status:", status);
    console.error("Amadeus error details:", details);

    return NextResponse.json(
      { message: "Amadeus error", status, details },
      { status }
    );
  }
}
