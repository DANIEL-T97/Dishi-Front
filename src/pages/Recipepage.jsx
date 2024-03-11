import React, { useEffect, useState } from 'react'
import { FaBookmark, FaDotCircle } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { MdMessage} from 'react-icons/md'
import PostComment from '../components/PostComment'
import Recommend from '../components/Recommend'
import RecipeRatingForm from '../useractions/RecipeRatingForm'
import StarRated from '../useractions/Star-rated'
import { stringify } from 'postcss'

const Recipepage = () => {
    const {id} = useParams()
    const [recipeData, setRecipeData] = useState(null)
    const [userData , setUserData] = useState(null)

    const [isFavorite, setIsFavorite] = useState(false);
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch recipe data
          const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/recipes/${id}`);
          const data = await response.json();
          setRecipeData(data);
  
          // Fetch user data based on user_id from the recipe
          const userResponse = await fetchUserData(data.user_id);
          const userData = await userResponse.json();
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [id]);

    if (!recipeData) {
        return <div>Loading...</div>;
      }
  const addFavorite =(id)=>{
    fetch("https://dishi-tamu-webapp-backend.onrender.com/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ recipe_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recipe", id);
        setIsFavorite(!isFavorite)
        

      });

 
  }

  return (
    <div className='w-5/6 mx-auto py-8'>
        {/* top  */}
        <div className='flex items-center justify-between'>
        <p className='font-semibold text-md my-8' >Recipe / {recipeData.title}</p>

        <button onClick={()=>addFavorite(id)} className={`${isFavorite?"bg-orange-500 hover:bg-orange-400": "bg-pink-500 hover:bg-pink-400"}  flex items-center gap-2 
        text-white px-4 py-2 rounded-md`}>
            <FaBookmark/>{isFavorite?"Added to favorites":"add to favorites"}</button>
        </div>

       

        {/* recipe content */}
        <div>
        <h1 className='text-5xl font-display font-bold'>{recipeData.title}</h1>
        <div className='flex gap-8 my-4'>
          <p>{recipeData.user_name}</p>
          
          
          
        {/* <p>User: {userData ? userData.name : 'Loading user data...'}</p> */}
        <p className='text-black flex items-center'>
          <MdMessage className=''size={20}/>{(recipeData.comments)}</p>

          <StarRated rating={recipeData.average_rating} />

        </div>

        {/* divider */}
        <div className='w-full bg-gray-300 h-[1px] my-4'></div>

        {/* content */}
        <div className='grid gap-4'>
        <p>{recipeData.description}</p>

        <img src={recipeData.image_url} alt="" className='h-[70vh] w-full rounded-md object-cover'/>
        
        <div className='w-3/4 md:w-1/3 flex gap-8  my-4'>
          <div>
          <p className='uppercase text-gray-400 font-medium '>prep time</p>
          <p className='uppercase'>{recipeData.prep_time}</p>
          </div>

          <div>
            <p className='uppercase text-gray-400 font-medium'>cook time</p>
            <p className='uppercase'>{recipeData.cook_time}</p>
          </div>
        </div>
        
        {/* ingredients and directions */}
        <div className='grid md:grid-cols-3'>
          <div>
            <h1 className='capitalize text-2xl mb-4 font-display font-semibold'>ingredients</h1>
            <div className='grid gap-2'>
              {recipeData.ingredients.map((item,index)=>(
                <p key={index+item} className='flex gap-4 items-center text-lg'><FaDotCircle/>{item}</p>
              ))}
            </div>
          </div>
          {/* directions */}
          <div className='col-span-2'>
          <h1 className='capitalize text-2xl mb-4 font-display font-semibold'>instructions</h1>
          <div className='grid gap-4'>
            {recipeData.instructions.map((item, index)=>(
              <div key={index+item} className='flex items-center gap-2'>
                <p className='bg-pink-500 h-8 px-3 py-2 w-8 rounded-full text-white text-md font-medium'>{index +1}</p>
              <p className='text-xl italic text-gray-700'>{item}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
        </div>
        </div>
        {/* divider */}
        <div className='w-full h-2 bg-orange-500 my-8'></div>
          {/* Recipe rating form */}
          <RecipeRatingForm recipeId={id} />

{/* divider */}
        <div className='w-full h-2 bg-orange-500 my-8'></div>

{/* comments inputs */}
<PostComment recipe_id={id}/>
<Recommend/>
    </div>
  )
}

export default Recipepage