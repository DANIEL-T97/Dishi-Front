import React, { useEffect, useState } from 'react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';


const UserMealplan = ({mealPlans,setMealPlans}) => {
  const [editMealPlan, setEditMealPlan] = useState({
    id: "",
    title: "",
    price: "",
    description: ""
  });
  

  useEffect(() => {
    fetch("https://dishi-tamu-webapp-backend.onrender.com/meal_plans", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setMealPlans(data);
      })
      .catch(error => {
        console.error('Error fetching meal plans:', error);
      });
  }, []);

  

  const handleDeleteMealPlan = (id) => {
    fetch(`https://dishi-tamu-webapp-backend.onrender.com/meal_plan/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then(() => {
        setMealPlans(mealPlans.filter(mealPlan => mealPlan.id !== id));
      })
      .catch(error => {
        console.error('Error deleting meal plan:', error);
      });
  };

  

  const handleEditMealPlan = (id) => {
    if (editMealPlan.price !== "" && isNaN(parseFloat(editMealPlan.price))) {
      console.error('Price must be a valid number');
      return;
    }

    const updatedMealPlan = {
      title: editMealPlan.title,
      price: editMealPlan.price === "" ? null : parseFloat(editMealPlan.price),
      description: editMealPlan.description,
    };

    fetch(`https://dishi-tamu-webapp-backend.onrender.com/meal_plan/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(updatedMealPlan),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update meal plan');
        }
        return res.json();
      })
      .then(() => {
        setMealPlans(prevMealPlans =>
          prevMealPlans.map(plan =>
            plan.id === id ? { ...plan, ...updatedMealPlan }
             : plan
          )
        );
        setEditMealPlan({
          id: "",
          title: "",
          price: "",
          description: ""
        });
      })
      .catch(error => {
        console.error('Error updating meal plan:', error);
      });
  };

  const handleChange = (e, field) => {
    setEditMealPlan({ ...editMealPlan, [field]: e.target.value });
  };

  const handleToggleEdit = (id) => {
    if (editMealPlan.id === id) {
      setEditMealPlan({
        id: "",
        title: "",
        price: "",
        description: ""
      });
    } else {
      const selectedMealPlan = mealPlans.find(plan => plan.id === id);
      setEditMealPlan({
        id: selectedMealPlan.id,
        title: selectedMealPlan.title,
        price: selectedMealPlan.price.toString(),
        description: selectedMealPlan.description
      });
    }
  };

  return (
    <div className='my-8'>
      <h1 className='capitalize text-2xl mb-4 font-display font-semibold'>Your Mealplans</h1>
      <div className='grid gap-8'>
        {mealPlans.map((item, index) => (
          <div key={item.id} className='grid grid-cols-6 border border-gray-300 rounded-lg p-2'>
            <div className='col-span-5 flex items-center gap-4'>
              <p className='font-extrabold text-gray-400 text-2xl'>{index + 1}</p>
              <div>
                {editMealPlan.id === item.id ? (
                  <div className="max-w-md mx-auto mt-6">
        <div className="mb-4 flex items-center">
                    <label htmlFor="title" className="text-lg  mb-1">Title:</label>
                    <input
                      type="text"
                      id="title"
                      value={editMealPlan.title}
                      onChange={(e) => handleChange(e, 'title')}
                      placeholder="Title"
                      className="w-3/4 px-3 py-2 rounded border border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                    />
                    </div>
                     <div className="mb-4 flex items-center">
                    <label htmlFor="price" className="text-lg  mb-1">Price:</label>
                    <input
                      type="number"
                      id="price"
                      value={editMealPlan.price}
                      onChange={(e) => handleChange(e, 'price')}
                      placeholder="Price"
                      className="w-3/4 px-3 py-2 rounded border border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                    />
                    </div>
                    <div className="mb-4 flex items-center">
                    <label htmlFor="description" className="text-lg  mb-1">Description:</label>
                    <input
                      type="text"
                      id="description"
                      value={editMealPlan.description}
                      onChange={(e) => handleChange(e, 'description')}
                      placeholder="Description"
                      className="w-full px-3 py-2 rounded border border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                    />
                    </div>

                    <button type="button" onClick={() => handleEditMealPlan(item.id)} className='flex text-green-600 items-center px-4 py-2 text-lg gap-2 border border-green-600 rounded mt-2'>
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className='text-lg font-semibold line-clamp-2'>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            </div>
            <div className='items-center w-full grid gap-4'>
              <button onClick={() => handleToggleEdit(item.id)} className='flex text-green-600 items-center px-4 py-2 text-lg gap-2 border border-green-600 rounded'>
                <MdOutlineEdit /> {editMealPlan.id === item.id ? 'Cancel' : 'Edit'}
              </button>
              <button onClick={() => handleDeleteMealPlan(item.id)} className='flex text-red-600 items-center px-4 py-2 text-lg border border-gray-400 rounded'>
                <MdDeleteOutline /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMealplan;
