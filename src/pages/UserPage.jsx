import React, { useState } from 'react'
// import { FaArrowLeft } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import UserRecipe from '../components/UserRecipe'
import UserMealplan from '../components/UserMealplan'
import { IoCloseCircleOutline } from 'react-icons/io5'
import UserProfile from '../components/Userprofile'
import { data } from 'autoprefixer'



const UserPage = (

) => {
  const [isAddMealOpen , setIsAddMealOpen] = useState(false)
  const [isAddRecipeOpen , setIsAddRecipeOpen] = useState(false)
// add recipe useStates

  const [recipes , setRecipes] = useState([])
  const [instructions, setInstructions] = useState(['']);
  const [ingredients, setIngredients] = useState(['']);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [category, setCategory] = useState('');
  const [prep_time, setPrep_time] = useState('');
  const [cook_time, setCook_time] = useState('');
  const [image_url, setImage_url] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeInstruction = (index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  
    // if (file) {
    //   // Perform any additional checks or operations on the selected file
    //   console.log("Selected file:", file);
  
    //   // If you need to display a preview of the image, you can use FileReader
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     // `reader.result` contains the base64-encoded image data
    //     const previewUrl = reader.result;
    //     console.log("Image preview URL:", previewUrl);
    //     // Update state or do something with the preview URL if needed
    //   };
    //   reader.readAsDataURL(file);
  
    //   // Update state or perform other actions with the file object
    //   setImage_url(file);
    // }
    if (file) {
      // Use FileReader to read the file content
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the file content or perform other actions
        setImage_url(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // In your render or JSX
 
  


//meal_plan use states
const [mealPlans, setMealPlans] = useState([]);
const[title,setTitle] = useState("")
const[price,setPrice] = useState("")
const[description,setDescription] = useState("")

const handleCreateMealPlan = (e) => {
  e.preventDefault();
  fetch('https://dishi-tamu-webapp-backend.onrender.com/meal_plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: parseFloat(price),
    }),
  })
  .then(res => res.json())
  .then(data => {
    const newMealPlan = data;
    console.log('After fetch');
    // Update the local state with the new meal plan
    console.log('New Meal Plan:', newMealPlan);
    setMealPlans(prevMealPlans => [...prevMealPlans, newMealPlan]);
    setIsAddMealOpen(false);
  })
  .catch(error => {
    console.error('Error creating meal plan:', error);

  });
  setPrice('')
  setDescription('')
  setTitle('')
};


  const handleAddRecipeModal=()=>{
    setIsAddRecipeOpen(!isAddRecipeOpen)
  }

  const handleAddMealModal=()=>{
    setIsAddMealOpen(!isAddMealOpen)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // If all validations pass, proceed with the API call
    fetch('https://dishi-tamu-webapp-backend.onrender.com/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        title: recipeTitle,
        description: recipeDescription,
        image_url: image_url,
        category: category,
        instructions: instructions,
        ingredients: ingredients,
        prep_time: prep_time,
        cook_time: cook_time,
      })
      
    })
    .then(res => res.json())
    .then((data) => {
      const newRecipe = data;
    
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
      setIsAddRecipeOpen(false);
 
    })
    .catch((err) => {
      console.error(err);
    });
  };
  

  return (
    <div className='w-5/6 mx-auto grid md:grid-cols-4 py-8  gap-8'>
      {/* profile */}
      <UserProfile />


      {/* content */}
      <div className='col-span-3 my-8 md:my-0'>
        {/* navigation */}
        <div className='flex items-center gap-4 md:gap-12'>
        <button  onClick={handleAddRecipeModal} className='text-orange-500 border-2 border-orange-500 bg-white font-medium px-4 py-2 flex items-center gap-2 rounded'> <FaPlus/> Add new recipe</button>
          <button onClick={handleAddMealModal}  className='text-orange-500 border-2 border-orange-500 bg-white font-medium px-4 py-2 flex items-center gap-2 rounded'> <FaPlus/> Add new meal plan</button>

        </div>
        {/* divider */}
        <div className='w-full bg-gray-400 h-[1px] my-4'></div>
        <UserRecipe recipes={recipes} setRecipes={setRecipes}/>
        <div className='w-full bg-gray-400 h-[1px] my-4'></div>
        <UserMealplan mealPlans={mealPlans} setMealPlans={setMealPlans}/>


{/* add recipe  */}
{isAddRecipeOpen && (
<div className=''>
      <div className='fixed top-0 right-0 w-full h-full mx-auto bg-black bg-opacity-30'></div>
      {/* add meal plan */}
      <div className='absolute z-10 w-full md:w-1/2 right-0 md:right-1/4 top-8  bg-white p-8 rounded '>
        <div className='relative'>
          <IoCloseCircleOutline onClick={()=>setIsAddRecipeOpen(false)} className=' float-end text-pink-500' size={30}/>
        <h2 className='text-3xl font-display font-bold text-center' >Create New Recipe</h2>
        <form action="" className='grid gap-2' onSubmit={handleSubmit}>
          
        <div className='grid gap-2'>
            <label className='font-medium text-lg'>Image Url</label>
          <input type="text"
          value={image_url}
          className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
          onChange={(e)=>setImage_url(e.target.value)} />
          </div>

          <div className='grid gap-2'>
            <label className='font-medium text-lg'>Title</label>
          <input type="text"
          value={recipeTitle}
          className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
          onChange={(e)=>setRecipeTitle(e.target.value)} />
          </div>

          <div className='grid gap-2'>
            <label className='font-medium text-lg'>Description</label>
          <input type="text"
          value={recipeDescription}
          className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
          onChange={(e)=>setRecipeDescription(e.target.value)} />
          </div>
          
          <div className='grid gap-2'>
            <label className='font-medium text-lg'>Category</label>
          <input type="text"
          value={category}
          className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
          onChange={(e)=>setCategory(e.target.value)} />
          </div>
          
          <div className='flex gap-4'>
          <div className='grid gap-2'>
            <label className='font-medium text-lg'>Prep Time</label>
          <input type="text"
          value={prep_time}
          className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
          onChange={(e)=>setPrep_time(e.target.value)} />
          </div>
          
          <div className='grid gap-2'>
            <label className='font-medium text-lg'>Cook Time</label>
          <input type="text"
          value={cook_time}
          className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder-italic placeholder-font-light'
          onChange={(e)=>setCook_time(e.target.value)} />
          </div>
          </div>

          <div>
            <label className='font-medium text-lg'>Instruction:</label>
            <div>
          {instructions.map((instruction, index) => (
          <div className='w-full flex items-center' key={index}>
            <input
              type="text"
              required
              value={instruction}
              className='bg-gray-200 w-[90%] p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder:italic placeholder:font-light'
              onChange={(e) => handleInstructionChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeInstruction(index)}>
              <MdClose size={25}/> 
            </button>
          </div>
        ))}
        </div>

        <button className='my-2 mx-4' type="button" onClick={addInstruction}>
          <FaPlus size={20}/>
        </button>
        </div>

        <div>
            <label className='font-medium text-lg'>Ingredients:</label>
            <div>
          {ingredients.map((ingredient, index) => (
          <div className='w-full flex items-center' key={index}>
            <input
              type="text"
              required
              value={ingredient}
              className='bg-gray-200 w-[90%] p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder:italic placeholder:font-light'
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              <MdClose size={25}/> 
            </button>
          </div>
        ))}
        </div>
        <button className='my-2 mx-4' type="button" onClick={addIngredient}>
          <FaPlus size={20}/>
        </button>
        </div>

        <button type='submit' className='bg-pink-500 rounded-md text-lg text-white font-medium px-8 py-2'>Add Recipe</button>

          
        </form>
      </div>
      </div>
      </div>
)}



{/* add mealplan */}
{ isAddMealOpen && (
      <div className=''>
      <div className='fixed top-0 right-0 w-full h-full mx-auto bg-black bg-opacity-30'></div>
      {/* add meal plan */}
      <div className='fixed z-10 w-1/2 right-1/4 top-8  bg-white p-8 rounded '>
        <div className='relative'>
          <IoCloseCircleOutline onClick={()=>setIsAddMealOpen(false)} className=' float-end text-pink-500' size={30}/>
        <h2 className='text-3xl font-display font-bold text-center' >Create New Meal Plan</h2>
      <form onSubmit={handleCreateMealPlan} className='grid gap-4 my-8'>
        

        <div className='grid'>
        <label className=' font-medium text-lg'>Title:</label>
        <input 
        type="text" 
        value={title} 
        placeholder='Add title'
        className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder:italic placeholder:font-light'
        onChange={(e)=>setTitle(e.target.value)} />
        </div>
       
       
        <div className='grid'>
        <label className=' font-medium text-lg'>Price:</label>
        <input 
        type="number" 
        value={price} 
        placeholder='Add price'
        className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder:italic placeholder:font-light'
        onChange={(e)=>setPrice(e.target.value)} />
        </div>

        <div className='grid'>
        <label className=' font-medium text-lg'>Description:</label>
        <input 
        type="text" 
        value={description}
        placeholder='Add description'
        className='bg-gray-200 p-2 focus:outline-none focus:border focus:border-pink-300 rounded-md placeholder:italic placeholder:font-light' 
        onChange={(e)=>setDescription(e.target.value)} />
        </div>

        <button type='submit'
         className='bg-pink-500 rounded-md text-lg text-white font-medium px-8 py-2'
          >Create</button>
      </form>
      </div>
      </div>
      </div>
      )}

      </div>

    </div>
  )
}

export default UserPage