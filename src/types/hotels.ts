export type Hotel = {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  description: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
  available: boolean;
};
