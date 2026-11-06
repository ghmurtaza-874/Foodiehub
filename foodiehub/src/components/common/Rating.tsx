import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
}

export const Rating = ({ value, count, size = 14 }: RatingProps) => (
  <span className="fh-rating" aria-label={`Rated ${value} out of 5`}>
    <Star size={size} aria-hidden="true" />
    <span>{value.toFixed(1)}</span>
    {count !== undefined && (
      <span className="fh-text-muted" style={{ fontWeight: 400, marginLeft: 4 }}>
        ({count})
      </span>
    )}
  </span>
);
