import React from 'react';

const StarRated = ({ rating }) => {
    const maxStars = 5;

    const renderStars = () => {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating - fullStars >= 0.5;
  
      const starArray = Array.from({ length: maxStars }, (_, index) => {
        if (index < fullStars) {
          return <span key={index} className="text-yellow-500 text-2xl">&#9733;</span>; // Filled star
        } else if (hasHalfStar && index === fullStars) {
          return <span key={index} className="text-yellow-500 text-2xl">&#9733;</span>; // Half-filled star
        } else {
          return <span key={index} className="text-gray-1000 text-2xl">&#9734;</span>; // Grey non-filled star
        }
      });
  
      return starArray;
    };
  
    return (
      <div className="flex items-center">
        {renderStars()}
      </div>
    );
  };
  

export default StarRated;
