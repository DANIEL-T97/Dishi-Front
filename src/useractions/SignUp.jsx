import React, { useRef, useState } from 'react'
import { FaChevronCircleLeft, FaChevronLeft } from 'react-icons/fa';
import { IoFastFoodSharp } from 'react-icons/io5';
import { LuLock, LuMail, LuPhone, LuUser } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';


const SignUp = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
 



  const sendEmail = (e) => {
    e.preventDefault();

  


    emailjs.send('service_m25fsoq', 'template_dz161u4' ,{ to_email: email }, 'PQDUc7EogTr6KJCUl',)
      .then(
        (result) => {
          console.log(result.text);
          
       ; // Reset the form
        },
        (error) => {
          console.log(error.text);
          // Display an error message to the user
          alert('Error sending message, please try again!');
        }
      );
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email_address':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'phone_number':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://dishi-tamu-webapp-backend.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number,
        }),
      });
      if (!response.ok) {
        throw new Error(`Sign up failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Sign up successful', data);

      
      navigate(`/confirm/${email} `)
      sendEmail()
    } catch (error) {
      console.error('Sign up failed', error.message);
      if (error.message.includes("Invalid email address")) {
        setError('Invalid email address. Please provide a valid email.');
      } else if (error.message.includes("Password must be between 8 and 50 characters")) {
        setError('Password must be between 8 and 50 characters.');
      } else if (error.message.includes("User with that email address already exists")) {
        setError('User with that email address already exists. Please choose another email.');
      } else if (error.message.includes("Phone number must be exactly 10 digits")) {
        setError('Phone number must be exactly 10 digits.');
      } else if (error.message.includes("Phone number must consist of numbers only")) {
        setError('Phone number must consist of numbers only.');
      } else {
        setError('An error occurred during sign up. Please try again.');
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
      {/* back */}
      <Link to={'/'} className='bg-pink-500 text-white absolute md:p-4 p-2 rounded-md'>
        <FaChevronLeft size={20} />
      </Link>

      {/* logo */}
      <div className='w-full md:w-2/5 md:mx-auto flex justify-center my-4'>
        <h1 className='text-4xl ml-8 font-extrabold font-dancing-script flex items-center '>
          Dishi-Tamu
          <IoFastFoodSharp className='text-pink-500' />
        </h1>
      </div>
      {/* register form */}
      <div className='p-4 md:w-2/5 mx-auto shadowy border border-pink-100 md:p-8 rounded-md overflow-hidden'>
        <h2 className='text-3xl text-center font-semibold font-display'>Sign Up</h2>
        <form onSubmit={handleSignUp} className='grid md:gap-8 gap-4 mt-8'>
          {/* name */}
          <div className='flex gap-2 items-center border-b border-gray-300 '>
            <LuUser size={25} className='text-gray-400' />
            <input
              type='text'
              name='name'
              value={name}
              onChange={handleInputChange}
              className='text-lg focus:outline-none py-1 w-[90%] placeholder:capitalize'
              placeholder='Full Names'
              required
            />
          </div>
          {/* email */}
          <div className='flex gap-2 items-center border-b border-gray-300 '>
            <LuMail size={25} className='text-gray-400' />
            <input
              type='email'
              name='email_address'
              value={email}
              onChange={handleInputChange}
              className='text-lg focus:outline-none py-1 w-[90%] placeholder:capitalize'
              placeholder='Email Address'
              required
            />
          </div>
          {/* phone */}
          <div className='flex gap-2 items-center border-b  border-gray-300 '>
            <LuPhone size={25} className='text-gray-400' />
            <input
              type='tel'
              name='phone_number'
              value={phone_number}
              onChange={handleInputChange}
              className='text-lg focus:outline-none py-1 w-[90%] placeholder:capitalize'
              placeholder='Phone'
              required
            />
          </div>
          {/* password */}
          <div className='flex gap-2 items-center border-b border-gray-300 '>
            <LuLock size={25} className='text-gray-400' />
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              className='text-lg focus:outline-none py-1 w-[90%] placeholder:capitalize'
              placeholder='Password'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-pink-500 text-white font-semibold py-4 w-1/2 mx-auto rounded-lg'
          >
            Sign Up
          </button>
          <p className='text-center my-2'>
            Have an account?{' '}
            <Link to={'/login'} className='cursor-pointer text-pink-500 capitalize'>
              Login
            </Link>
          </p>
          <p>
            By creating an account, you agree to our{' '}
            <span className='cursor-pointer text-pink-500 capitalize'>
              terms & conditions
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
