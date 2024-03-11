import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    // Load meal plans from localStorage on component mount
    const storedMealPlans = JSON.parse(localStorage.getItem("mealPlans")) || [];
    setMealPlans(storedMealPlans);

    fetch("https://dishi-tamu-webapp-backend.onrender.com/meal_plan/all")
      .then((res) => res.json())
      .then((data) => {
        setMealPlans(data);
      })
      .catch((error) => {
        console.error("Error fetching meal plans:", error);
      });
  }, []);

  const handleToggleFavorite = (id) => {
    setMealPlans((prevMealPlans) =>
      prevMealPlans.map((mealPlan) =>
        mealPlan.id === id
          ? { ...mealPlan, favorite: !mealPlan.favorite }
          : mealPlan
      )
    );
  };

  useEffect(() => {
    // Save meal plans to localStorage whenever the mealPlans state changes
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
  }, [mealPlans]);

  return (
    <div className='my-8 w-5/6 mx-auto '>
      <h1 className='capitalize text-4xl mb-4 font-display font-semibold'>Meal Plans</h1>
    
      <div className='w-full h-[1px] bg-gray-300 my-4'></div>
      <ul className='grid gap-8'>
        {mealPlans.map(mealPlan => (
          <li key={mealPlan.id}>
            <div className='grid grid-cols-3'>
              <div>
                <strong>Title:</strong> {mealPlan.title}<br />
                <strong>Price:</strong> Ksh {(mealPlan.price)*100}<br />
                <strong>Description:</strong> {mealPlan.description}<br />
              </div>
              <div></div>
              {/* buy button */}
              <div className='flex flex-col items-end gap-4'>
                <Link
                  to={`/mealplan/checkout/${mealPlan.id}`}
                  className='bg-orange-500 w-1/4 mr-8 px-4 py-2 rounded text-white'
                >
                  Buy Now
                </Link>
                {/* add to favorites */}
                <button
                  onClick={() => handleToggleFavorite(mealPlan.id)}
                  className='w-1/2 px-2 py-2 rounded flex items-center gap-2'
                >
                  {mealPlan.favorite ? (
                    <FaStar size={25} color='gold' />
                  ) : (
                    <FaStarHalfAlt size={25} />
                  )}
                  {mealPlan.favorite
                    ? 'Favorite'
                    : 'Add to Favorites'}
                </button>
              </div>
            </div>
            <div className='w-full bg-gray-200 h-[1px] mt-4'></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealPlans;
