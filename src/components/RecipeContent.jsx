import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StarRated from '../useractions/Star-rated';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://dishi-tamu-webapp-backend.onrender.com/recipe', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' :`Bearer ${localStorage.getItem('access_token')}`,
    }})
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
      });
  }, []); // Add an empty dependency array to ensure useEffect runs only once
}