import { useState, useEffect } from 'react';
import { Hotel } from '@/lib/mockData';
import { searchHotels } from '@/lib/api';

export function useHotelSearch(
  initialQuery: string = '',
  checkInDate?: string,
  checkOutDate?: string
) {
  const [query, setQuery] = useState(initialQuery);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchHotels(query, checkInDate, checkOutDate);
        setHotels(results);
      } catch (err) {
        setError('Failed to fetch hotels. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [query, checkInDate, checkOutDate]);

  return { query, setQuery, hotels, loading, error };
}
