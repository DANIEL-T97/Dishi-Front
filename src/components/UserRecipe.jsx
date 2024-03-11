import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdClose, MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

const UserRecipe = ({ recipes, setRecipes }) => {
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [editRecipe, setEditRecipe] = useState({
    id: null,
    image_url: '',
    title: '',
    description: '',
    category: '',
    prep_time: '',
    cook_time: '',
    instructions: [''],
    ingredients: [''],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://dishi-tamu-webapp-backend.onrender.com/recipe',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Ensure data is an array and not empty before setting the state
          if (Array.isArray(data) && data.length > 0) {
            setRecipes(data);
          } else {
            console.error('Data is not in the expected format:', data);
          }
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    };

    fetchData();
  }, [setRecipes]);

  const handleInputChange = (e, field) => {
    setEditRecipe({ ...editRecipe, [field]: e.target.value });
  };
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...editRecipe.instructions];
    updatedInstructions[index] = value;
    setEditRecipe({ ...editRecipe, instructions: updatedInstructions });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...editRecipe.ingredients];
    updatedIngredients[index] = value;
    setEditRecipe({ ...editRecipe, ingredients: updatedIngredients });
  };

  const addInstruction = () => {
    setEditRecipe({ ...editRecipe, instructions: [...editRecipe.instructions, ''] });
  };

  const addIngredient = () => {
    setEditRecipe({ ...editRecipe, ingredients: [...editRecipe.ingredients, ''] });
  };

  const removeInstruction = (index) => {
    const updatedInstructions = [...editRecipe.instructions];
    updatedInstructions.splice(index, 1);
    setEditRecipe({ ...editRecipe, instructions: updatedInstructions });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...editRecipe.ingredients];
    updatedIngredients.splice(index, 1);
    setEditRecipe({ ...editRecipe, ingredients: updatedIngredients });
  };

  const handleEditClick = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    if (recipeToEdit) {
      setEditRecipe({
        id,
        image_url: recipeToEdit.image_url,
        title: recipeToEdit.title,
        description: recipeToEdit.description,
        category: recipeToEdit.category,
        prep_time: recipeToEdit.prep_time,
        cook_time: recipeToEdit.cook_time,
        instructions: recipeToEdit.instructions ? recipeToEdit.instructions.split('\n') : [''],
        ingredients: recipeToEdit.ingredients ? recipeToEdit.ingredients.split('\n') : [''],
      });
      setIsAddRecipeOpen(true); // Open the modal
    } else {
      console.error('Recipe not found:', id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...updatedRecipe } = editRecipe;
  
    try {
      const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/recipes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(updatedRecipe),
      });
  
      if (response.ok) {
        const data = await response.json();
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) => (recipe.id === id ? data : recipe))
        );
        setIsAddRecipeOpen(false);
      } else {
        console.error('Error updating recipe data:', response.statusText);
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  };
  

  

  const handleDeleteRecipe = async (id, event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://dishi-tamu-webapp-backend.onrender.com/recipes/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.ok) {
        console.log('Recipe deleted successfully.');
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
      } else {
        console.error('Error deleting Recipe:', response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <div className='my-8'>
      <h1 className='capitalize text-2xl mb-4 font-display font-semibold'>Your Recipe</h1>
      <div className='grid grid-cols-4 gap-8'>
        {recipes.map((item) => (
          <div key={item.id} className='relative pb-10 border border-gray-300 rounded-lg p-2'>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image_url} alt="" className='w-full h-40 object-cover rounded-md' />
            </Link>
            <p className='text-lg font-semibold line-clamp-2'>{item.title}</p>
            <div className='absolute bottom-2 grid grid-cols-2 items-center gap-4'>
              <button
                className='flex text-green-600 items-center px-2 border border-green-600 rounded'
                onClick={() => handleEditClick(item.id)}
              >
                <MdOutlineEdit /> Edit
              </button>
              <button
                className='flex text-red-600 items-center px-2 border border-gray-400 rounded'
                onClick={(event) => handleDeleteRecipe(item.id, event)}
              >
                <MdDeleteOutline /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isAddRecipeOpen && (
        <div className=''>
          <div className='fixed top-0 right-0 w-full h-full mx-auto bg-black bg-opacity-30'></div>
          <div className='absolute z-10 w-1/2 right-1/4 top-8 bg-white p-8 rounded '>
            <div className='relative'>
              <IoCloseCircleOutline
                onClick={() => setIsAddRecipeOpen(false)}
                className=' float-end text-pink-500'
                size={30}
              />
              <h2 className='text-3xl font-display font-bold text-center'>Edit Recipe</h2>
              <form onSubmit={(e) => handleSubmit(e)} className='grid gap-2 my-4'>
  <div className='grid'>
    <label className='font-medium text-lg'>Image url:</label>
    <input
      type="text"
      value={editRecipe.image_url}
      placeholder='Upload image url'
      className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
      onChange={(e) => handleInputChange(e,'image_url')}
    />
  </div>
  <div className='grid'>
    <label className='font-medium text-lg'>Title:</label>
    <input
      type="text"
      value={editRecipe.title}
      placeholder='Add title'
      className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
      onChange={(e) => handleInputChange(e, 'title')}
    />
  </div>
  <div className='grid'>
    <label className='font-medium text-lg'>Description:</label>
    <input
      type="text"
      value={editRecipe.description}
      placeholder='Add Description'
      className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
      onChange={(e) => handleInputChange(e, 'description')}
    />
  </div>
  <div className='grid'>
    <label className='font-medium text-lg'>Category:</label>
    <input
      type="text"
      value={editRecipe.category}
      placeholder='Add Category'
      className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
      onChange={(e) => handleInputChange(e,'category')}
    />
  </div>
  <div className='grid grid-cols-2 gap-8'>
    <div className='grid'>
      <label className='font-medium text-lg'>Cook Time:</label>
      <input
        type="text"
        value={editRecipe.cook_time}
        placeholder='Cook time'
        className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
        onChange={(e) => handleInputChange(e,'cook_time')}
      />
    </div>
    <div className='grid'>
      <label className='font-medium text-lg'>Prep Time:</label>
      <input
        type="text"
        value={editRecipe.prep_time}
        placeholder='Prep time'
        className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
        onChange={(e) => handleInputChange(e,' prep_time')}
        
      />
    </div>
  </div>
  <div className='grid'>
    <label className='font-medium text-lg'>Instructions:</label>
    <div className='grid gap-2'>
      {editRecipe.instructions.map((instruction, index) => (
        <div className='w-full flex items-center' key={index}>
          <input
            type="text"
            value={instruction}
            className='bg-gray-200 w-[90%] p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
            onChange={(e) => handleInstructionChange(index, e.target.value)}
          />
          <button type="button" onClick={() => removeInstruction(index)}>
            <MdClose size={25} />
          </button>
        </div>
      ))}
    </div>
    <button className='my-2 mx-4' type="button" onClick={addInstruction}>
      <FaPlus size={20} />
    </button>
  </div>
  <div>
    <label className='font-medium text-lg'>Ingredients:</label>
    <div className='grid gap-2'>
      {editRecipe.ingredients.map((ingredient, index) => (
        <div className='w-full flex items-center' key={index}>
          <input
            type="text"
            className='bg-gray-200 w-[90%] p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
          />
          <button type="button" onClick={() => removeIngredient(index)}>
            <MdClose size={25} />
          </button>
        </div>
      ))}
    </div>
    <button className='my-2 mx-4' type="button" onClick={addIngredient}>
      <FaPlus size={20} />
    </button>
  </div>
  <button type='submit' className='bg-pink-500 rounded-md text-lg text-white font-medium px-8 py-2'>
    Edit Recipe
  </button>
</form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRecipe;
