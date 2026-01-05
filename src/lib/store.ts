import { create } from 'zustand';
import { Hotel } from "@/types/hotels";

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
}));
