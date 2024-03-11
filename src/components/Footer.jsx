import React from 'react'
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa'
import { IoFastFoodSharp } from 'react-icons/io5'

const Footer = () => {
  return (
    <div className='bg-gray-200 pt-20'>
      <div className='w-5/6 mx-auto grid md:grid-cols-5 pb-12'>
        <div className='col-span-3'>
          <h1 className='text-3xl  font-extrabold font-dancing-script flex items-center text-center'>Dishi-Tamu
            <IoFastFoodSharp className='text-pink-500' />
          </h1>
          <p className='my-4 text-gray-500 w-2/3'>Elevate your culinary journey with our app. Personalized recipes,
             smart shopping lists, and a vibrant community await. Experience
              the joy of cooking - where good food meets innovation!</p>
        </div>

        {/* sitemap */}
        <div className='grid md:grid-cols-3 gap-4 col-span-2'>
          {/* basic */}
          <div>
            <h2 className='text-lg font-medium'>Dishi Tamu</h2>
            <ul className='text-gray-500 mt-4 gap-2 grid'>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Feedback</li>
            </ul>
          </div>
          {/* advanced */}
          <div>
            <h2 className='text-lg font-medium'>Legal</h2>
            <ul className='text-gray-500 mt-4 gap-2 grid'>
              <li>Terms</li>
              <li>Conditions</li>
              <li>Cookies</li>
              <li>Copyright</li>
            </ul>
          </div>
          {/* socials */}
          <div>
            <h2 className='text-lg font-medium'>Follow</h2>
            <ul className='text-gray-500 mt-4 gap-2 grid'>
              <li className='capitalize'>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Youtube</li>
              <li>Pintrest</li>

            </ul>
          </div>

        </div>

      </div>

      {/* divider */}
      <div className='w-5/6 mx-auto  bg-gray-500 mt-4 h-[1px]'></div>

      {/* copryright */}
      <div className='py-4 w-5/6 mx-auto grid gap-2 md:flex justify-between'>
        <p>@2024 Dishi-Tamu - All Rights Reserved</p>
        <div className='flex items-center gap-4 px-2'>
          <FaFacebook 
          className='text-gray-600 hover:text-pink-400 transition-all duration-200'size={20} />
          <FaInstagram
          className='text-gray-600 hover:text-pink-400 transition-all duration-200'size={20} />
          <FaYoutube
          className='text-gray-600 hover:text-pink-400 transition-all duration-200'size={20} />
          <FaPinterest
          className='text-gray-600 hover:text-pink-400 transition-all duration-200'size={20} />
        </div>

      </div>
        
      
    </div>
  )
}

export default Footer
