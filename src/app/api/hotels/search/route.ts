import { NextResponse } from "next/server";
import Amadeus from "amadeus";

// ✅ Viktigt: Amadeus SDK behöver Node runtime (inte Edge)
export const runtime = "nodejs";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID!,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET!,
});

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
      .slice(0, 10)
      .map((h: any) => h.hotelId)
      .join(",");

    if (!hotelIds) return NextResponse.json([], { status: 200 });

    // 3) Offers (skicka datum om vi har dem)
    // Obs: vissa konton/endpoints kan kräva checkInDate/checkOutDate -> bra att skicka när du har.
    const offers = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      adults,
      ...(checkInDate ? { checkInDate } : {}),
      ...(checkOutDate ? { checkOutDate } : {}),
    });

    // Transform Amadeus response to Hotel interface
    const hotels = (offers.data ?? []).map((hotelOffer: any) => {
      const hotel = hotelOffer.hotel;
      const firstOffer = hotelOffer.offers?.[0];
      
      return {
        id: hotel.hotelId,
        name: hotel.name || 'Hotel',
        location: {
          city: hotel.cityCode || '',
          country: hotel.address?.countryCode || '',
          address: hotel.address?.lines?.join(', ') || '',
          latitude: hotel.latitude || 0,
          longitude: hotel.longitude || 0,
        },
        description: hotel.description?.text || firstOffer?.room?.description?.text || 'No description available',
        rating: 4, // Amadeus doesn't provide ratings in this endpoint
        pricePerNight: firstOffer?.price?.total ? parseFloat(firstOffer.price.total) : 0,
        amenities: hotel.amenities || ['WiFi', 'Air Conditioning'],
        image: hotel.media?.[0]?.uri || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
        available: hotelOffer.available ?? true,
      };
    });

    return NextResponse.json(hotels, { status: 200 });
  } catch (err: any) {
    const status =
      err?.response?.statusCode ||
      err?.response?.status ||
      500;

    // Om det är ett vanligt Error-objekt: visa message/stack (annars blir stringify ofta "{}")
    if (err instanceof Error) {
      console.error("Amadeus error status:", status);
      console.error("Amadeus error message:", err.message);
      console.error("Amadeus error stack:", err.stack);

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

    const details =
      typeof raw === "string"
        ? raw
        : JSON.stringify(raw, null, 2);

    console.error("Amadeus error status:", status);
    console.error("Amadeus error details:", details);

    return NextResponse.json(
      { message: "Amadeus error", status, details },
      { status }
    );
  }
}



