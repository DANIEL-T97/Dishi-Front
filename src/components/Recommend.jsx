import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Recommend = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all recipes
        const response = await fetch('https://dishi-tamu-webapp-backend.onrender.com/recipes');
        const data = await response.json();

        // Slice the first 4 items
        const startIndex = Math.floor(Math.random() * data.length);

        // Slice a random subset of 4 items starting from the random index
        const slicedRecipes = data.slice(startIndex, startIndex + 4);

        setRecipes(slicedRecipes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to trigger the effect only once when the component mounts

  return (
    <div className='my-8'>
      <h1 className='capitalize text-2xl mb-4 font-display font-semibold'>You may also like</h1>
    <div className='grid md:grid-cols-4 gap-8'>

      {/* Display recommended recipes and user data here */}
      {recipes.map((item) => (
        <Link to={`/recipe/${item.id}`} key={item.id}>
          <img src={item.image_url} alt="" className='w-full h-40 object-cover rounded-md' />
          <p className='text-lg font-semibold'>{item.title}</p>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default Recommend;
