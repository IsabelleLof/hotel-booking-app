'use client';

import { useStore } from '@/lib/store';
import HotelCard from './HotelCard';
import { FaSearch } from 'react-icons/fa';

export default function GlobalHotelsSection() {
  const { hotels, query, loading } = useStore();

  if (!query || hotels.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-blue-50/50 rounded-3xl mt-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-3 rounded-full">
          <FaSearch className="text-blue-500 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Search Results</h2>
          <p className="text-gray-500">Found {hotels.length} hotels for "{query}"</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50">
          <p>Updating search...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.slice(0, 3).map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}
