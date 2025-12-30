'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { format } from 'date-fns';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FaCalendarAlt, FaUser, FaHotel } from 'react-icons/fa';

export default function ProfileContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const bookings = useStore((state) => state.bookings);
  const removeBooking = useStore((state) => state.removeBooking);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-12">
        {session.user?.image ? (
          <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-3xl">
            <FaUser />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {session.user?.name}</h1>
          <p className="text-gray-500">{session.user?.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <FaCalendarAlt className="text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-500 mb-6">Time to plan your next adventure!</p>
              <Link href="/">
                <Button>Find a Hotel</Button>
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="p-8 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
                      <FaHotel className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{booking.hotelName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt />
                          <span>
                            {format(new Date(booking.checkIn), 'MMM d, yyyy')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaUser />
                          <span>{booking.guests} guests</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Price</p>
                      <p className="text-lg font-bold text-gray-900">{booking.totalPrice} SEK</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeBooking(booking.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
