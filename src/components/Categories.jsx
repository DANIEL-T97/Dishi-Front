import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/recipes?category=${category}`);
      const data = await response.json();

      setRecipes(data);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className='py-4 bg-[#FFD7C9] pt-8'>
      <h1 className='my-2 mx-8 md:mx-4 text-center text-2xl font-display underline font-semibold tracking-8 '>Which Categories do you Prefer?</h1>
      <div className='w-5/6 mt-4 mx-auto grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        <div>
          <Link to={`/category/Vegetarian`} className='w-40 mx-auto rounded-full h-40 object-cover'>
          <img src='https://us.123rf.com/450wm/smon/smon2307/smon230705821/209378539-fresh-delights-nourishing-vegan-vegetarian-options-for-clean-eating.jpg?ver=6' alt='Vegetarian' className='rounded-full w-32 h-32 mx-auto mb-2' />
            <p className='text-center text-lg font-semibold'>Vegetarian</p>
          </Link>
        </div>
        <div>
          <Link to={`/category/Salad`} className='w-40 mx-auto rounded-full h-40 object-cover'>
          <img src='https://www.eatingwell.com/thmb/ZgUTobMJAI_Q-zTpj273piX18h0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EWL-250303-composed-salad-with-pickled-beets-smoked-tofu-Hero-02-9e2a9b7202a34d81908a4db78a927d57.jpg' alt='Salad' className='rounded-full w-32 h-32 mx-auto mb-2' />
            <p className='text-center text-lg font-semibold'>Salads</p>
          </Link>
        </div>
        <div>
          <Link to={`/category/Full Dish`} className='w-40 mx-auto rounded-full h-40 object-cover'>
          <img src='https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg' alt='Full Dish' className='rounded-full w-32 h-32 mx-auto mb-2' />
            <p className='text-center text-lg font-semibold'>Full Dish</p>
          </Link>
        </div>
        <div>
          <Link to={`/category/Dessert`} className='w-40 mx-auto rounded-full h-40 object-cover'>
          <img src='https://www.lacademie.com/wp-content/uploads/2022/04/types-of-dessert.jpg' alt='Dessert' className='rounded-full w-32 h-32 mx-auto mb-2' />
            <p className='text-center text-lg font-semibold'>Dessert</p>
          </Link>
        </div>
        <div>
          <Link to={`/category/Snacks`} className='w-40 mx-auto rounded-full h-40 object-cover'>
          <img src='https://media.self.com/photos/5ebd7a636ed447b59b846244/4:3/w_2560%2Cc_limit/snack-plate.jpg' alt='Snacks' className='rounded-full w-32 h-32 mx-auto mb-2' />
            <p className='text-center text-lg font-semibold'>Snacks</p>
          </Link>
        </div>
        <div>
          <Link to={`/category/Breakfast`} className='w-40 mx-auto rounded-full h-40 object-cover'>
          <img src='https://media.istockphoto.com/id/863444442/photo/delicious-breakfast-on-a-light-table.jpg?s=170x170&k=20&c=zcjqjoBCYbX8O6li9U3vve5IQNTe8TiaZpcnyg6ghBE=' alt='Breakfast' className='rounded-full w-32 h-32 mx-auto mb-2' />
            <p className='text-center text-lg font-semibold'>Breakfast</p>
          </Link>
        </div>
        
      </div>

      
      <ul>
        
      {recipes.map((recipe) => (
          <li key={recipe.id}>
            <img src={recipe.image_url} alt={recipe.title} />
            <p>{recipe.title}</p>
            <p>{recipe.description}</p>
            {/* Add other details you want to display */}
          </li>
        ))}  
      </ul>
    </div>
  );
};

export default Categories;

