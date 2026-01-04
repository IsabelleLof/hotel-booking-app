// src/types/hotels.ts
// KOlla om detta funkar?

export type HotelLocation = {
  city: string;
  country?: string;
  address?: string;
  latitude: number;
  longitude: number;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Hotel = {
  id: string;
  name: string;
  location: HotelLocation;

  description?: string;
  rating?: number;
  stars?: number;
  reviewCount?: number;
  reviews?: Review[];

  pricePerNight?: number;
  amenities?: string[];
  image: string; // Made required as we always provide a fallback or API uri
  gallery?: string[];

  available?: boolean;
  policies?: {
    checkIn?: string;
    checkOut?: string;
    cancellation?: string;
  };
};

