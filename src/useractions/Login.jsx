import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';
import { IoFastFoodSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { LuLock, LuMail, LuPhone, LuUser } from 'react-icons/lu';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add error state

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dishi-tamu-webapp-backend.onrender.com/login', {
        email: email,
        password: password
      });

      const { access_token, refresh_token } = response.data;

      // Store tokens securely (e.g., in memory, secure storage)
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Redirect to the dashboard page after successful login
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., display error message to the user)
      if (error.response && error.response.status === 404) {
        // Handle the case when the user is not found
        setError('User not found.');
      } else {
        // Handle other errors (e.g., display a general error message)
        setError('invalid password or email.');
      }
    }
  };

  return (
    <div className='p-8 relative'>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-lg relative">
          <p className="text-xl">
            {error}{' '}
            <span
              className="cursor-pointer absolute top-0 right-0 mr-2 mt-1"
              onClick={() => setError(null)}
            >
              &#10006;
            </span>
          </p>
        </div>
      )}
      {/* Back */}
      <Link to={'/'} className='bg-pink-500 text-white absolute p-2 md:p-4 rounded-md'>
        <FaChevronLeft size={20} />
      </Link>
      {/* Logo */}
      <div className='md:w-2/5 mx-auto flex justify-center my-4'>
        <h1 className='text-4xl ml-8 font-extrabold font-dancing-script flex items-center'>
          Dishi-Tamu
          <IoFastFoodSharp className='text-pink-500' />
        </h1>
      </div>
      {/* Login Form */}
      <div className='md:w-2/5 mx-auto shadowy border border-pink-100 p-8 rounded-md overflow-hidden'>
        <h2 className='text-3xl text-center font-semibold font-display'>Login</h2>
        <form onSubmit={handleLogin} className='grid gap-8 mt-8'>
          {/* Email */}
          <div className='flex gap-2 items-center border-b border-gray-300 '>
            <LuMail size={25} className='text-gray-400' />
            <input
              type='email'
              className='text-lg focus:outline-none py-1 placeholder:capitalize'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className='flex gap-2 items-center border-b border-gray-300 '>
              <LuLock size={25} className='text-gray-400' />
              <input
                type='password'
                className='text-lg focus:outline-none py-1 placeholder:capitalize'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Forgot Password */}
            <div className='flex justify-end mt-2'>
              <Link to='/forgot-password' className='text-pink-500'>
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type='submit'
            className='bg-pink-500 text-white font-semibold py-4 w-1/2 mx-auto rounded-lg'
          >
            Login
          </button>
          <p className='text-center'>
            Don't have an account{' '}
            <Link to='/signup' className='text-pink-500 capitalize'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
