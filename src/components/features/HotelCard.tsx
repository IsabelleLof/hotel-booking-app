'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Hotel } from '@/types/hotels'; // Keep existing import
import Button from '../ui/Button';
import StarRating from '../ui/StarRating';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  // Provide default values for potentially optional fields to prevent lint errors
  const {
    image = '/images/placeholder-hotel.jpg', // Default image
    name = 'Unnamed Hotel',
    pricePerNight = 0,
    rating = 0,
    location,
    description = 'No description available for this hotel.',
    amenities = [],
    id,
  } = hotel;

  const city = location?.city || 'Unknown City';
  const country = location?.country || 'Unknown Country';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
          {pricePerNight} SEK <span className="text-xs font-normal text-gray-600">/ night</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{name}</h3>
          <StarRating rating={rating} size={14} />
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <FaMapMarkerAlt className="text-blue-500" />
          <span className="line-clamp-1">{city}, {country}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              +{amenities.length - 3} more
            </span>
          )}
        </div>
        
        <Link href={`/hotels/${id}`} className="block">
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </motion.div>
  );
}
