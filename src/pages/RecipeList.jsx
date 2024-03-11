import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StarRated from '../useractions/Star-rated';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://dishi-tamu-webapp-backend.onrender.com/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
      });
  }, []); // Add an empty dependency array to ensure useEffect runs only once

  return (
    <div className='py-8 w-5/6 mx-auto'>
      <h1 className='my-2 text-center text-2xl font-display underline font-semibold tracking-8 underline-offset-2'>All Recipes</h1>
      <div className='grid md:grid-cols-4 gap-8'>
      {recipes.map((item) => (
        <div key={item.id} className='border border-gray-400 overflow-hidden rounded-md'>
        <Link to={`/recipe/${item.id}`} key={item.id} >
          <img src={item.image_url} alt=""className='w-full h-40 object-cover rounded-t-md' />
          <p className='text-lg font-semibold text-center'>{item.title}</p>
          
        </Link>
        <div className='flex flex-col items-center mt-2'>
        <StarRated rating={item.average_rating} />
              </div>
        </div>
      ))}
      
      </div>
    </div>
  );
};

export default RecipeList;
