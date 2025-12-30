import Image from "next/image";
import { notFound } from "next/navigation";
import { getHotelByIdServer } from "@/lib/api.server";
import BookingSection from "@/components/features/BookingSection";
import StarRating from "@/components/ui/StarRating";
import { FaMapMarkerAlt } from "react-icons/fa";

export default async function HotelDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Next 16.1

  const hotel = await getHotelByIdServer(id);

  if (!hotel) notFound();

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[50vh] w-full">
        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{hotel.name}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt />
              <span>{hotel.location.city}, {hotel.location.country}</span>
            </div>
            <StarRating rating={hotel.rating} size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">About this place</h2>
              <p className="text-gray-600 text-lg">{hotel.description}</p>
            </section>
          </div>

          <div className="lg:col-span-1">
            <BookingSection hotel={hotel} />
          </div>
        </div>
      </div>
    </div>
  );
}


