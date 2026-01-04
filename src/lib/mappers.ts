import type { Hotel } from "@/types/hotels";

/**
 * Simple hash function to generate a stable seed from a string (hotelId)
 */
function getSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Transforms an Amadeus API hotel offer object into our internal Hotel type,
 * enriching it with stable "random" data where the API is sparse.
 */
export function mapAmadeusToHotel(hotelOffer: any): Hotel {
  const hotel = hotelOffer.hotel;
  const firstOffer = hotelOffer.offers?.[0];
  const hotelId = hotel.hotelId;
  const seed = getSeed(hotelId);

  // Generate stable random values
  const stars = (seed % 3) + 3; // 3, 4, or 5 stars
  const reviewCount = (seed % 500) + 50;
  const rating = 3.5 + (seed % 15) / 10; // 3.5 to 5.0

  const galleryImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
  ];

  // Rotate gallery based on seed
  const gallery = [...galleryImages].sort((a, b) => (getSeed(a + hotelId) % 10) - 5);

  const reviews = [
    {
      id: "rev1",
      userName: "Alex J.",
      rating: Math.min(5, Math.floor(rating + 0.5)),
      comment: "Truly a wonderful stay. The staff went above and beyond.",
      date: "2023-10-15",
    },
    {
      id: "rev2",
      userName: "Maria S.",
      rating: Math.min(5, Math.floor(rating)),
      comment: "Great location and very clean rooms. Would recommend!",
      date: "2023-11-02",
    },
  ];

  return {
    id: hotelId,
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
      "Experience luxury and comfort in the heart of the city. Our hotel offers premium service and world-class amenities for both leisure and business travelers.",
    rating,
    stars,
    reviewCount,
    reviews,
    pricePerNight: firstOffer?.price?.total ? parseFloat(firstOffer.price.total) : 250,
    amenities: hotel.amenities || ["WiFi", "Air Conditioning", "Pool", "Spa", "Gym", "Restaurant"],
    image: hotel.media?.[0]?.uri || gallery[0],
    gallery,
    available: hotelOffer.available ?? true,
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in",
    },
  };
}
