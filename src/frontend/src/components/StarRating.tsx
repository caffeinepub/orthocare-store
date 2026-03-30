import { Star } from "lucide-react";

export function StarRating({
  rating,
  count,
}: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "fill-star-yellow text-star-yellow"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
      {count !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
}
