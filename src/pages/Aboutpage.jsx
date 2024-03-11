import React, { useState } from 'react';
import { FaTwitter, FaInstagram, FaTiktok, FaFacebook, FaPinterest } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';

const AboutPage = () => {
  const [isOpen , setIsOpen] =useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen)
    // Add your form submission logic here
  };

  return (
    <div className="bg-gray-100 p-7 f ">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 ">About Us</h1>
          <p className="text-lg mb-4">
            Welcome to <span className="text-orange-500 font-bold text-2xl">Dishi Tamu Recipe App</span>, your ultimate destination for delicious recipes and culinary inspiration!
          </p>
          <div className='grid grid-cols-2 gap-8 mt-20'>
            <div>
          <h2 className="text-2xl font-bold mb-2 mt-12 underline text-orange-500">Our Mission</h2>
          <p className="text-lg">At Dishi Tamu, we are passionate about bringing you a diverse range of mouthwatering recipes, cooking tips, and food-related content to elevate your culinary experience.</p>
          </div>
          <img 

          src="https://c.ndtvimg.com/2023-10/vh0cjvdo_food-photography_625x300_08_October_23.jpg?im=FaceCrop,algorithm=dnn,width=800,height=450" alt="Mission Image" className="mx-auto mt-6 w-full h-auto object-cover max-h-96 rounded-md" />
        </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-8">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIYYVsbbheTiO_vacGncFuKjPBVHaE-Ln2YA&usqp=CAU" alt="Flavors Image" 
        className="w-full h-auto max-h-80 rounded-md object-cover" />
          <div className=" mb-4 mx-8 mt-12">
          <h2 className="text-2xl font-bold mb-2 underline text-pink-500">Explore a World of Flavors</h2>
            <p className="text-lg  ">Indulge in a culinary journey as we take you through a world of flavors, from comforting classics to innovative dishes that will tantalize your taste buds.</p>
          </div>
        </div>

        <div className="mb-8   grid space-x-8">
          <h2 className="text-2xl text-center font-bold mb-2">Meet the Team</h2>
          <p className=' text-center mx-auto'>Behind every recipe and food story, there's a dedicated team of food enthusiasts and culinary experts who strive to bring you the best content to spark your creativity in the kitchen.</p>
          <div className='grid grid-cols-6 mt-8'>
          <div className="  flex flex-col justify-center items-center">
            <div className="flex-shrink-0">
              <img src="https://ih1.redbubble.net/image.619283242.6349/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg" alt="Team Member 1" className="w-16 h-16 rounded-full" />
            </div>
            <div className='text-center' >
              <h3 className="text-lg font-bold ">Sheila Chepkemoi</h3>
              <p className="text-gray-600">Founder </p>
            </div>
          </div>

          <div className="  flex flex-col justify-center items-center">
            <div className="flex-shrink-0">
              <img src="https://static.displate.com/1200x857/displate/2020-05-29/a3340392c4bf6508f85c095a026e9e83_e34c22144a8bc0354186e81f3be773d5.jpg" alt="Team Member 2" className="w-16 h-16 rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Isaac Kiplangat</h3>
              <p className="text-gray-600">Chief Executive Officer</p>
            </div>
          </div>

          <div className="  flex flex-col justify-center items-center">
            <div className="flex-shrink-0">
              <img src="https://ih1.redbubble.net/image.3712513417.5688/gbra,8x10,1000x1000-c,0,0,675,900.jpg" alt="Team Member 2" className="w-16 h-16 rounded-full" />
            </div>
            <div className='text-center'>
              <h3 className="text-lg font-bold">Joyce</h3>
              <p className="text-gray-600">Marketing Director</p>
            </div>
          </div>
          <div className="  flex flex-col justify-center items-center">
            <div className="flex-shrink-0">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDP87G23_uDEPhTnn6KWJy8rL3zF_7OUfWUQ&usqp=CAU" alt="Team Member 2" className="w-16 h-16 rounded-full" />
            </div>
            <div className='text-center'>
              <h3 className="text-lg font-bold">Daniel Mwangi</h3>
              <p className="text-gray-600">Financial Manager</p>
            </div>
          </div>
          <div className="  flex flex-col justify-center items-center">
            <div className="flex-shrink-0">
              <img src="https://i.pinimg.com/originals/e1/4a/bc/e14abc4477beaa9fcc230c484daf12fa.jpg" alt="Team Member 2" className="w-16 h-16 rounded-full" />
            </div>
            <div className='text-center'>
              <h3 className="text-lg font-bold">Joseph Kagwi</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
          </div>

          <div className="  flex flex-col justify-center items-center">
            <div className="flex-shrink-0">
              <img src="https://www.shutterstock.com/image-vector/kr-initial-monogram-logo-260nw-342900599.jpg" alt="Team Member 2" className="w-16 h-16 rounded-full" />
            </div>
            <div className='text-center'>
              <h3 className="text-lg font-bold">Klein Rutto</h3>
              <p className="text-gray-600">Information Technology Director</p>
            </div>
          </div>
        </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <p className="text-lg">Have a question, suggestion, or just want to say hello? We'd love to hear from you!</p>
          <form onSubmit={handleSubmit} className="mt-4">
            <input type="text" placeholder="Your Name" className="block w-full p-2 mb-2 rounded" />
            <input type="email" placeholder="Your Email" className="block w-full p-2 mb-2 rounded" />
            <textarea placeholder="Your Message" rows="4" className="block w-full p-2 mb-4 rounded"></textarea>
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Submit</button>
          </form>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Follow Us</h2>
          <p className="text-lg">Stay connected with us on social media for the latest updates, recipes, and foodie adventures:</p>
          <ul className="flex items-center space-x-4 mt-4">
            <li><a href="#" className="text-blue-500"><FaTwitter size={24} /></a></li>
            <li><a href="#" className="text-rose-500"><FaInstagram size={24} /></a></li>
            <li><a href="#" className="text-black-"><FaTiktok size={24} /></a></li>
          </ul>
        </div>

      </div>


      {/* thank you message */}
      {isOpen && (
      <div className='h-screen'>
      <div onClick={()=>setIsOpen(false)} className='absolute bg-black bg-opacity-20 w-full h-full top-0 right-0'></div>
      <div className='fixed top-[35vh] w-1/3 left-1/3 bg-white h-[30vh]'>
        <div className=' relative py-8'>
        <IoCloseCircleOutline onClick={()=>setIsOpen(false)} className='absolute top-4 right-4'/>

        <h1 className='text-center text-2xl  font-bold bg-gradient-to-r from-pink-500  to-orange-500  bg-clip-text text-transparent'>Thank You for Contacting us</h1>
        <p className='text-center text-lg font medium  my-4'>We will contact you soon!</p>
        <div className='flex items-center justify-between w-1/3 mx-auto my-4'>
          <FaInstagram/>
          <FaFacebook/>
          <FaTiktok/>
          <FaPinterest/>
        </div>
        </div>

      </div>
      </div>
      )}



    </div>
  );
};

export default AboutPage;
