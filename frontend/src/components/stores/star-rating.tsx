"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  readOnly?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  readOnly = false,
  onRate,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    if (!readOnly && onRate) {
      onRate(index + 1);
    }
  };
  
  const displayRating = hoverRating > 0 ? hoverRating : rating;

  return (
    <div 
      className={cn("flex items-center gap-1", className)}
      onMouseLeave={() => !readOnly && setHoverRating(0)}
    >
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFull = displayRating >= starValue;
        const isHalf = displayRating > index && displayRating < starValue;
        const starColor = readOnly ? "text-yellow-400 fill-yellow-400" : "text-primary fill-primary";

        return (
          <div 
            key={index} 
            className="relative" 
            style={{ width: size, height: size }}
            onMouseOver={() => !readOnly && setHoverRating(starValue)}
            onClick={() => handleClick(index)}
          >
            <Star
              style={{ width: size, height: size }}
              className={cn(
                'text-gray-300 fill-gray-300 dark:text-gray-600 dark:fill-gray-600',
                !readOnly && 'cursor-pointer'
              )}
            />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: readOnly ? (isFull ? '100%' : isHalf ? `${(displayRating - index) * 100}%` : '0%') : (isFull ? '100%' : '0%') }}
            >
              <Star
                style={{ width: size, height: size }}
                className={cn(
                  starColor,
                  !readOnly && 'cursor-pointer'
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
