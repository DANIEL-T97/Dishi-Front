import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useParams, Link } from "react-router-dom";

const Favouritepage = () => {
  const { userId } = useParams();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`https://dishi-tamu-webapp-backend.onrender.com/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error("Error fetching favorites:", error));
  }, [userId]);

  const handleDelete = (favoriteId) => {
    fetch(`https://dishi-tamu-webapp-backend.onrender.com/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.favourite_id !== favoriteId)
          );
        } else {
          console.error("Failed to delete favorite recipe");
        }
      })
      .catch((error) =>
        console.error("Error deleting favorite recipe:", error)
      );
  };

  return (
    <div className="w-5/6 mx-auto mt-8">
      <h2 className="w-full text-2xl font-bold mb-4">My Favorite Recipes</h2>

    <div className="grid md:grid-cols-4">
      {favorites.map((favorite) => (
        <div 
        style = {{backgroundImage:`url(${favorite.image})`}} 
        key={favorite.favorite_id} 
        className="mb-4 overflow-hidden mr-4 flex items-center h-40 bg-cover rounded-md relative">

   <div onClick={() =>handleDelete(favorite.favourite_id)} className="absolute top-0 right-0 p-2 bg-orange-500 text-white rounded-bl-2xl">
    <MdClose/>
   </div>
          <div className="flex absolute bottom-0 px-2 right-0 w-full py-2 bg-black bg-opacity-50 flex-col">
            <Link
              to={`/recipe/${favorite.recipe_id}`}
              className="text-orange-500 text-xl font-bold hover:underline line-clamp-1"
            >
              {favorite.title}
            </Link>
           
          </div>
        </div>
      ))}
      </div>  
    </div>
  );
};

export default Favouritepage;
