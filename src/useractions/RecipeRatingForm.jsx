import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import axios from 'axios';

const RecipeRatingForm = ({ recipeId }) => {
  const [initialRatingFromServer, setInitialRatingFromServer] = useState(0);
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem('recipeRating');
    return storedRating ? parseInt(storedRating, 10) : 0;
  });

  useEffect(() => {
    setInitialRatingFromServer(0);
    localStorage.removeItem('recipeRating');  // Clear local storage
    fetchInitialRatingFromServer()
      .then((data) => {
        if (!localStorage.getItem('recipeRating')) {
          setRating(data.rating);
        }
      })
      .catch((error) => {
        console.error('Error fetching initial rating:', error);
      });
  }, [recipeId]);
  

  const fetchInitialRatingFromServer = async () => {
    try {
      const response = await axios.get(`https://dishi-tamu-webapp-backend.onrender.com/ratings/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching initial rating:', error);
      throw error;
    }
  };

  const handleRate = (selectedRating) => {
    setRating(selectedRating);
    sendRatingToServer(selectedRating);
    localStorage.setItem('recipeRating', selectedRating.toString());
  };

  const sendRatingToServer = async (selectedRating) => {
    try {
      // Check if the user has already rated the recipe (to decide between POST and PATCH)
      const initialRating = rating > 0 ? rating : null;

      if (initialRating !== null) {
        // If initialRating is present, it means the user is updating an existing rating (PATCH)
        await axios.patch(`https://dishi-tamu-webapp-backend.onrender.com/ratings/${recipeId}`, {
          rating: selectedRating,
          previous_rating: initialRating,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
      } else {
        // If initialRating is not present, it means the user is submitting a new rating (POST)
        await axios.post('https://dishi-tamu-webapp-backend.onrender.com/ratings', {
          rating: selectedRating,
          recipe_id: recipeId,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
      }
    } catch (error) {
      console.error('Error sending rating to server:', error);
    }
  };

  return (
    <div>
      <StarRating initialRating={rating} onRate={handleRate} />
      <p className="text-2xl my-2 font-display font-semibold text-gray-800">Current Rating: {rating}</p>
    </div>
  );
};

export default RecipeRatingForm;
