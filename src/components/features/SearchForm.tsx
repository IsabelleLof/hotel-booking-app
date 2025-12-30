'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';
import Button from '../ui/Button';

export default function SearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('q', location);
    if (startDate) params.set('checkIn', startDate.toISOString());
    if (endDate) params.set('checkOut', endDate.toISOString());
    params.set('guests', guests.toString());
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-3xl shadow-xl flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto border border-gray-100">
      <div className="flex-1 w-full md:w-auto relative group">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Location</label>
        <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-blue-500 transition-all">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-400 font-medium"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="h-12 w-px bg-gray-200 hidden md:block" />

      <div className="flex-1 w-full md:w-auto relative group">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Dates</label>
        <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-blue-500 transition-all">
          <FaCalendarAlt className="text-gray-400 mr-3" />
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            placeholderText="Check-in - Check-out"
            className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-400 font-medium"
            dateFormat="MMM d"
            minDate={new Date()}
          />
        </div>
      </div>

      <div className="h-12 w-px bg-gray-200 hidden md:block" />

      <div className="w-full md:w-40 relative group">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Guests</label>
        <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-blue-500 transition-all">
          <FaUser className="text-gray-400 mr-3" />
          <input
            type="number"
            min="1"
            max="10"
            className="bg-transparent border-none outline-none w-full text-gray-900 font-medium"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full md:w-auto px-8 py-4 h-full rounded-2xl shadow-blue-600/30">
        Search
      </Button>
    </form>
  );
}
