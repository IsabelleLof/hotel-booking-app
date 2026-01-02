// src/types/hotels.ts
// KOlla om detta funkar?

export type HotelLocation = {
  city: string;
  country?: string;
  address?: string;
  latitude: number;
  longitude: number;
};

export type Hotel = {
  id: string;
  name: string;
  location: HotelLocation;

  description?: string;
  rating?: number;

  pricePerNight?: number;
  amenities?: string[];
  image?: string;

  available?: boolean;
};

