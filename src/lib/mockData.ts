export interface Hotel {
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
}

export const MOCK_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Grand Stockholm Hotel',
    location: {
      city: 'Stockholm',
      country: 'Sweden',
      address: 'Södra Blasieholmshamnen 8',
      latitude: 59.3293,
      longitude: 18.0768,
    },
    description: 'Experience luxury in the heart of Stockholm with stunning views of the Royal Palace.',
    rating: 5,
    pricePerNight: 3500,
    amenities: ['Spa', 'Free WiFi', 'Restaurant', 'Gym', 'Pool'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    available: true,
  },
  {
    id: '2',
    name: 'Nordic Light Hotel',
    location: {
      city: 'Stockholm',
      country: 'Sweden',
      address: 'Vasaplan 7',
      latitude: 59.3326,
      longitude: 18.0560,
    },
    description: 'A modern design hotel located right next to the Central Station.',
    rating: 4,
    pricePerNight: 1800,
    amenities: ['Free WiFi', 'Bar', 'Breakfast included'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000',
    available: true,
  },
  {
    id: '3',
    name: 'Gothenburg City Stay',
    location: {
      city: 'Gothenburg',
      country: 'Sweden',
      address: 'Drottninggatan 1',
      latitude: 57.7089,
      longitude: 11.9746,
    },
    description: 'Affordable and comfortable stay in the center of Gothenburg.',
    rating: 3,
    pricePerNight: 900,
    amenities: ['Free WiFi', 'Kitchenette'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000',
    available: true,
  },
  {
    id: '4',
    name: 'Malmö Seaside Resort',
    location: {
      city: 'Malmö',
      country: 'Sweden',
      address: 'Sundspromenaden 1',
      latitude: 55.6096,
      longitude: 12.9921,
    },
    description: 'Relax by the sea with beautiful views of the Öresund Bridge.',
    rating: 4.5,
    pricePerNight: 2200,
    amenities: ['Spa', 'Beach Access', 'Restaurant', 'Bar'],
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1000',
    available: true,
  },
  {
    id: '5',
    name: 'Icehotel Jukkasjärvi',
    location: {
      city: 'Kiruna',
      country: 'Sweden',
      address: 'Marknadsvägen 63',
      latitude: 67.8515,
      longitude: 20.5951,
    },
    description: 'The world famous hotel made of ice and snow.',
    rating: 5,
    pricePerNight: 4500,
    amenities: ['Ice Bar', 'Sauna', 'Experience'],
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&q=80&w=1000',
    available: true,
  },
];
