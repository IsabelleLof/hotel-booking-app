import SearchForm from '@/components/features/SearchForm';
import HotelCard from '@/components/features/HotelCard';
import GlobalHotelsSection from '@/components/features/GlobalHotelsSection';
import { searchHotelsServer } from '@/lib/api.server';
import { FaFire } from 'react-icons/fa';
import { Hotel } from '@/types/hotels';

export default async function Home() {
  // Fetch real trending hotels (e.g., from Stockholm)
  const featuredHotels: Hotel[] = await searchHotelsServer('Stockholm');
  const displayHotels = featuredHotels.slice(0, 3);

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

      {/* Global Search Results (Client-side) */}
      <GlobalHotelsSection />

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-orange-100 p-3 rounded-full">
            <FaFire className="text-orange-500 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Trending Stockholm</h2>
            <p className="text-gray-500">Real-time offers available right now in Sweden's capital</p>
          </div>
        </div>

        {displayHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">Searching for the best offers...</p>
          </div>
        )}
      </section>
    </div>
  );
}
