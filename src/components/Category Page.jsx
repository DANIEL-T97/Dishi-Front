import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/recipes?category=${category}`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">{category}</h2>
      <ul className="flex flex-wrap -mx-4">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="mb-4 px-4 w-full sm:w-1/2 lg:w-1/3">
            <img src={recipe.image_url} alt={recipe.title} className="w-full h-60 object-cover mb-2 rounded-md" />
            <p className="text-pink-500 text-xl text-bold font-fancy">{recipe.title}</p>
            <p className="text-gray-600">{recipe.description}</p>
            <p className="text-gray-600">Cook Time : {recipe.cook_time}</p>
            <p className="text-gray-600">Prep Time : {recipe.prep_time}</p>
            
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
