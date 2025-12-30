import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}

export default function StarRating({ rating, max = 5, size = 16 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {[...Array(max)].map((_, i) => {
        const value = i + 1;
        if (value <= rating) {
          return <FaStar key={i} size={size} />;
        } else if (value - 0.5 <= rating) {
          return <FaStarHalfAlt key={i} size={size} />;
        } else {
          return <FaRegStar key={i} size={size} className="text-gray-300" />;
        }
      })}
    </div>
  );
}
