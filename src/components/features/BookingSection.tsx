'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Hotel } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import Button from '../ui/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BookingSectionProps {
  hotel: Hotel;
}

export default function BookingSection({ hotel }: BookingSectionProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const addBooking = useStore((state) => state.addBooking);
  
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = async () => {
    if (!session) {
      signIn();
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setIsBooking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * hotel.pricePerNight;

    addBooking({
      id: Math.random().toString(36).substr(2, 9),
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn: startDate,
      checkOut: endDate,
      guests,
      totalPrice,
    });

    setIsBooking(false);
    router.push('/profile');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">{hotel.pricePerNight} SEK</span>
        <span className="text-gray-500"> / night</span>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
          <div className="p-3 border border-gray-200 rounded-xl bg-gray-50">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              placeholderText="Select dates"
              className="bg-transparent w-full outline-none text-sm"
              minDate={new Date()}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <div className="p-3 border border-gray-200 rounded-xl bg-gray-50">
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Service fee</span>
          <span>0 SEK</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-100">
          <span>Total</span>
          <span>
            {startDate && endDate 
              ? `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * hotel.pricePerNight} SEK` 
              : '---'}
          </span>
        </div>
      </div>

      <Button 
        onClick={handleBook} 
        className="w-full mt-6" 
        size="lg"
        disabled={isBooking}
      >
        {isBooking ? 'Processing...' : session ? 'Book Now' : 'Sign in to Book'}
      </Button>
      
      {!session && (
        <p className="text-xs text-center text-gray-500 mt-3">
          You won't be charged yet
        </p>
      )}
    </div>
  );
}
