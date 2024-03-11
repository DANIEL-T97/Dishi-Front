import React, { useRef } from 'react'
import Cuisine from '../assets/cuisine.webp'
import EmailIcon from '../assets/email.webp'
import {  Link, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ConfirmPage = () => {
    
    const { email } = useParams()
    
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const EmailAd = email

    emailjs.send('service_5utfutk', 'template_dz161u4' ,{ to_email: EmailAd }, 'PQDUc7EogTr6KJCUl',)
      .then(
        (result) => {
          console.log(result.text);
        
        },
        (error) => {
          console.log(error.text);
          // Display an error message to the user
          alert('Error sending message, please try again!');
        }
      );
  };

  return (
    <div style={{backgroundImage: `url(${Cuisine})`}} className=' w-full h-screen bg-cover relative'>
        <div className='absolute w-full h-full bg-pink-600 bg-opacity-20'></div>
        <div className='absolute w-1/2 bg-white left-1/4 h-[60vh]  top-1/4 rounded-lg shadow-md grid gap-2 '>
            <h1 className='text-4xl font-bold pt-4 text-center capitalize'>Thank you For Signing Up</h1>
            <img src={EmailIcon} alt=""  className='h-[20vh] scale-105 mx-auto object-cover'/>

            <p className='text-center w-3/4 mx-auto text-lg'>We have sent an email to 
            <span className='bg-gradient-to-l from-pink-500 to-orange-500 px-2 mx-2 
            font-bold bg-clip-text text-transparent '>{email} </span>
            confirm validity of your email. Follow you email instruction to complete your registration</p>

            <div className=' flex gap-8 w-1/2 mx-auto mb-4 justify-center'>
            <p onClick={sendEmail} className='text-center cursor-pointer text-lg font-semibold text-pink-500 '>Resend email</p>
            <Link to={'/'} className='text-center text-lg font-semibold cursor-pointer text-pink-500'>Home</Link>
            </div>

        </div>


    </div>
  )
}

export default ConfirmPage