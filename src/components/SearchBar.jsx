// SearchBar.js
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const handleSearch = () => {
    if (!recipes) {
      // If recipes is undefined or null, do not attempt to filter
      return;
    }
  
    const filtered = recipes.filter(recipe =>
      recipe && recipe.name && typeof recipe.name === 'string' &&
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setFilteredRecipes(filtered);
  
  
  
  return (
    <form className='flex border-pink-500 border-2 p-1 rounded-full pl-2 items-center '>
      <input
        className='w-3/4 py-1 focus:outline-none'
        type='text'
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch();
        }}
      />
      <button
        className='bg-pink-500 text-white font-medium rounded-full flex gap-1 items-center  px-2 py-1 '
        type='button'
        onClick={handleSearch}
      >
        <FaSearch /> Search
      </button>
    </form>
  );
};

export default SearchBar;

