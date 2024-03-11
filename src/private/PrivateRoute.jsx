// // PrivateRoute.js
// import { Outlet, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PrivateRoute = ({ routePath }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('accessToken');
//   const isAuthenticated = !!token;

//   // Define routes that require authentication
//   const protectedRoutes = ['/dashboard', '/favourites'];

//   if (protectedRoutes.includes(routePath) && !isAuthenticated) {
//     // Redirect to login if the route requires authentication and the user is not authenticated
//     navigate("/login") ;
//     return null
    
//   }

//   if (isAuthenticated) {
//     // Set the authorization header for Axios requests
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     // Clear the authorization header if not authenticated
//     delete axios.defaults.headers.common['Authorization'];
//   }

//   // Render the protected content
//   return <Outlet />;
// };

// export default PrivateRoute;
import React from 'react'
import {useNavigate, Outlet} from "react-router-dom"

const PrivateRoute = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('access_token')
  
  return (
    <div>
      {token ? <Outlet/> : navigate('/login')}
    </div>
  )
}

export default PrivateRoute