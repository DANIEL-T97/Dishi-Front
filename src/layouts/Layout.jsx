import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dishi-tamu-webapp-backend.onrender.com/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data || []); // Ensure data.recipes is defined or default to an empty array
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Update showResults only if there is a non-empty search input
    setShowResults(searchTerm.trim() !== '' && filteredRecipes.length > 0);
    
     // Reset showResults to false if the search term is empty
  if (searchTerm.trim() === '') {
    setShowResults(false);
  }
  };

  return (
    <div className='relative'>
    <Navbar setShowResults={setShowResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      <div className='min-h-[60vh] '>
       
      {showResults && (
        <div className=' absolute z-10 rounded-md shadowy right-6  p-8 w-[96%] mx-auto top-36 mt-6  bg-white'>
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} onClick={()=>setShowResults(false)} className=''>
              <Link to={`/recipe/${recipe.id}`} className=' flex gap-4 my-4'>
              <img src={recipe.image_url} className='h-12 w-12 rounded-full object-cover' alt="" />
              <div className='grid'>
              <h2 className='font-semibold'>{recipe.title}</h2>
              <p className='text-sm'>{recipe.description}</p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
