import { create } from 'zustand';
import { Hotel } from "@/types/hotels";
import { searchHotels } from '@/lib/api';

interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
}

interface AppState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  favorites: string[];
  toggleFavorite: (hotelId: string) => void;
  
  // New Global Search State
  query: string;
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  performSearch: (q: string, checkIn?: string, checkOut?: string) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  bookings: [],
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  removeBooking: (id) => set((state) => ({ bookings: state.bookings.filter((b) => b.id !== id) })),
  favorites: [],
  toggleFavorite: (hotelId) => set((state) => {
    if (state.favorites.includes(hotelId)) {
      return { favorites: state.favorites.filter((id) => id !== hotelId) };
    }
    return { favorites: [...state.favorites, hotelId] };
  }),

  // Initial Search State
  query: '',
  hotels: [],
  loading: false,
  error: null,

  // Search Action
  performSearch: async (q, checkIn, checkOut) => {
    set({ loading: true, error: null, query: q });
    try {
      const results = await searchHotels(q, checkIn, checkOut);
      set({ hotels: results, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch hotels. Please try again.', loading: false });
    }
  },
}));


