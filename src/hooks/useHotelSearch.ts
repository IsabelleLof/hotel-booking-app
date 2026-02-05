import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';

export function useHotelSearch(
  initialQuery: string = '',
  checkInDate?: string,
  checkOutDate?: string
) {
  const { hotels, loading, error, performSearch } = useStore();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const triggerSearch = async () => {
      // Only search if there's a query
      if (query) {
        await performSearch(query, checkInDate, checkOutDate);
      }
    };

    triggerSearch();
  }, [query, checkInDate, checkOutDate, performSearch]);

  return { query, setQuery, hotels, loading, error };
}
