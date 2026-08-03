import React from "react";
import { IconStar } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showNumeric?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 18,
  showNumeric = true,
  className,
}: StarRatingProps) {
  const rounded = Math.round(rating * 10) / 10;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          return <IconStar key={i} size={size} filled={filled} />;
        })}
      </div>
      {showNumeric && (
        <span className="text-xs font-bold text-gray-900">{rounded.toFixed(1)}</span>
      )}
    </div>
  );
}
