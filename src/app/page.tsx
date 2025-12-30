import SearchForm from '@/components/features/SearchForm';
import HotelCard from '@/components/features/HotelCard';
import { MOCK_HOTELS } from '@/lib/mockData';
import { FaFire } from 'react-icons/fa';

export default function Home() {
  // In a real app, we might fetch featured hotels from API
  const featuredHotels = MOCK_HOTELS.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Find Your Next <span className="text-blue-400">Adventure</span>
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Discover and book the best hotels for your perfect getaway. Luxury, comfort, and style await.
          </p>
          
          <SearchForm />
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-orange-100 p-3 rounded-full">
            <FaFire className="text-orange-500 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Trending Destinations</h2>
            <p className="text-gray-500">Most popular choices for travelers from Sweden</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
    </div>
  );
}
