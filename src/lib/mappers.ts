import type { Hotel } from "@/types/hotels";

/**
 * Transforms an Amadeus API hotel offer object into our internal Hotel type.
 */
export function mapAmadeusToHotel(hotelOffer: any): Hotel {
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
}
