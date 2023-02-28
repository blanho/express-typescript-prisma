import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

type RatingProps = {
  stars: number;
  reviews: number;
};

function Rating({ stars, reviews }: RatingProps) {
  const countStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>{stars >= index + 1 ? <BsStarFill /> : stars >= number ? <BsStarHalf /> : <BsStar />}</span>
    );
  });
  return (
    <div className="rating">
      <div className="stars">{countStars}</div>
      <span>{reviews} reviews</span>
    </div>
  );
}

export default Rating;
