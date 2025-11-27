import { useState } from "react";
import style from "./StarRating.module.css";

interface StarRatingProps {
    rating: number;           
    maxStars?: number;      
    readOnly?: boolean;   
    onChange?: (nota: number) => void; 
    size?: "small" | "medium" | "large";
}

export function StarRating({ 
    rating, 
    maxStars = 5, 
    readOnly = false, 
    onChange,
    size = "medium" 
}: StarRatingProps) {
    
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        if (!readOnly) setHoverRating(index);
    };

    const handleMouseLeave = () => {
        if (!readOnly) setHoverRating(null);
    };

    const handleClick = (index: number) => {
        if (!readOnly && onChange) {
            onChange(index);
        }
    };

    const starsArray = Array.from({ length: maxStars }, (_, i) => i + 1);

    return (
        <div className={`${style.container} ${!readOnly ? style.interactive : ''}`}>
            {starsArray.map((starIndex) => {
                const valueToCompare = hoverRating !== null ? hoverRating : rating;
                
                const isFilled = starIndex <= Math.round(valueToCompare);

                return (
                    <i
                        key={starIndex}
                        className={`
                            bi bi-star-fill 
                            ${style.starIcon} 
                            ${style[size]}
                            ${isFilled ? style.filled : style.empty}
                        `}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starIndex)}
                    />
                );
            })}
        </div>
    );
}