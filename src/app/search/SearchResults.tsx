'use client';

import { useSearchParams } from 'next/navigation';
import { useHotelSearch } from '@/hooks/useHotelSearch';
import HotelCard from '@/components/features/HotelCard';
import SearchForm from '@/components/features/SearchForm';
import { motion } from 'framer-motion';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const checkInDate = searchParams.get('checkIn') || undefined;
  const checkOutDate = searchParams.get('checkOut') || undefined;
  const { hotels, loading, error } = useHotelSearch(query, checkInDate, checkOutDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <SearchForm />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {query ? `Search Results for "${query}"` : 'All Hotels'}
        </h1>
        <p className="text-gray-500 mt-2">
          Found {hotels.length} properties
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-2xl" />
              <div className="p-5 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-20 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-3xl">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <HotelCard hotel={hotel} />
            </motion.div>
          ))}
        </div>
      )}

      {!loading && hotels.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
