import React, { useState, useEffect } from 'react';
import { MdMail, MdPhone } from 'react-icons/md';
import { getUserEmailFromToken } from './Authutils';
import { defaults } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const [userData, setUserData] = useState({
    user_id: getUserEmailFromToken(),  // Add user_id to userData state
    name: '',
    email: '',
    phone_number: '',
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);


  


  const fetchUserData = async () => {
    try {
       
        
      const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :`Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        // Handle error
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const handleUpdateUser = async (e) => {
     e.preventDefault();
    try {
      const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User information updated successfully.');
        setShowForm(false); // Hide the form after updating
      } else {
        console.error('Error updating user information:', response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCancelUpdate = () => {
    // Reset form fields or any other necessary actions
    setShowForm(false);
  };
  const [deleteSuccess, setDeleteSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :`Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        console.log('Account deleted successfully.');
        setDeleteSuccess(true);  // Set delete success state to true
        // Navigate back to the home page after successful deletion
        navigate('/');
      } else {
        // Handle error
        console.error('Error deleting account:', response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <div className='grid gap-2 h-60 py-4 z-10'>
      {/* Display user information */}
      <h2 className='text-3xl font-medium'>{userData.name}</h2>
      <p className='flex items-center gap-2 text-lg'> <MdMail /> {userData.email}</p>
      <p className='flex items-center gap-2 text-lg'> <MdPhone /> {userData.phone_number}</p>

      {/* Editable form for updating user information */}
      {showForm ? (
        <form className="max-w-md mx-auto mt-6">
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 w-1/4">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-3/4 px-3 py-2 rounded border border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 w-1/4">Email:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            disabled
            className="w-3/4 px-3 py-2 rounded border bg-pink-100"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 w-1/4">Phone Number:</label>
          <input
            type="tel"
            name="phone_number"
            value={userData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-3/4 px-3 py-2 rounded border border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={handleUpdateUser} className="bg-orange-500 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
          <button onClick={handleCancelUpdate} className="bg-white border border-red-600 hover:bg-gray-300 text-red-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </form>
      
      ) : (
        <button className='border my-2 py-2 rounded-lg border-pink-500 
        text-pink-500 text-lg font-normal' onClick={() => setShowForm(true)}>Update profile</button>
      )}
    
  
     {/* Display success message if account is deleted successfully */}
     {deleteSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          <p className="font-bold">your account is deleted successfully!</p>
        </div>
      )}

     

      {/* Button to trigger delete account */}
      <button className='border my-2 py-2 rounded-lg border-pink-500 
      text-pink-500 text-lg font-normal' onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default UserProfile;
