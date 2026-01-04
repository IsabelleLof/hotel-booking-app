import Image from "next/image";
import { notFound } from "next/navigation";
import { getHotelByIdServer } from "@/lib/api.server";
import BookingSection from "@/components/features/BookingSection";
import StarRating from "@/components/ui/StarRating";
import { FaMapMarkerAlt, FaCheckCircle, FaUserCircle, FaInfoCircle } from "react-icons/fa";

export default async function HotelDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const hotel = await getHotelByIdServer(id);

  if (!hotel) notFound();

  return (
    <div className="min-h-screen pb-20 bg-gray-50/50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {hotel.stars && (
              <div className="flex gap-0.5">
                {[...Array(hotel.stars)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
            )}
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">HOTEL</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">{hotel.name}</h1>
          <div className="flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <span className="text-lg">{hotel.location.address}, {hotel.location.city}</span>
            </div>
            {hotel.rating && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <StarRating rating={hotel.rating} size={18} />
                <span className="font-bold">{hotel.rating.toFixed(1)}</span>
                <span className="text-sm opacity-80">({hotel.reviewCount} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery Preview */}
            {hotel.gallery && hotel.gallery.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hotel.gallery.map((img: string, idx: number) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <Image src={img} alt={`${hotel.name} gallery ${idx}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{hotel.description}</p>
            </section>

            {/* Amenities */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                What this place offers
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {hotel.amenities?.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-3 text-gray-700">
                    <FaCheckCircle className="text-green-500 shrink-0" />
                    <span className="font-medium text-sm lg:text-base">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            {hotel.reviews && hotel.reviews.length > 0 && (
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-8">Guest Reviews</h2>
                <div className="space-y-8">
                  {hotel.reviews.map((rev: any) => (
                    <div key={rev.id} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <FaUserCircle className="text-3xl text-gray-300" />
                          <div>
                            <p className="font-bold text-gray-900">{rev.userName}</p>
                            <p className="text-sm text-gray-500">{rev.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold">
                          {rev.rating} / 5
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Policies */}
            {hotel.policies && (
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-500" />
                  House Rules & Policies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Check-in / Check-out</h3>
                    <p className="text-gray-600">Check-in: {hotel.policies.checkIn}</p>
                    <p className="text-gray-600">Check-out: {hotel.policies.checkOut}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Cancellation</h3>
                    <p className="text-gray-600">{hotel.policies.cancellation}</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sticky Booking Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSection hotel={hotel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


