import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import RecipeList from './RecipeList';

const Homepage = ({searchTerm, setSearchTerm}) => {
  
 

 
  

  return (
    <div>
      <Carousel />
      <Categories />
      <RecipeList  />
      <Newsletter />
    </div>
  );
};

export default Homepage;
