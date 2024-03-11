import React, { useState, useEffect } from 'react';
import Vegan from '../assets/vegan.webp';
import Dessert from '../assets/dessert.webp';
import Beef from '../assets/beef.webp';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  { img: Vegan, desc: "Enjoy Vegan Meals", title: "we have vegan recipes for you" },
  { img: Dessert, desc: "Sweet Treats", title: "Indulge in delicious desserts" },
  { img: Beef, desc: "Savor the Flavor", title: "Delicious Beef Recipes" },
];

const Slideshow = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % slides.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide change after 5 seconds (adjust the duration as needed)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      nextImage();
    }, 3000); // Change slide every 5 seconds

    return () => clearTimeout(timeoutId);
  }, [currentImage]);

  return (
    <div className="flex h-[60vh] w-full justify-center items-center ">
      <div 
      style={{backgroundImage:  `url(${slides[currentImage].img})`}} 
      className=' bg-cover  w-full top-0 right-0 h-full bg-black bg-opacity-15'>
      {/* <button
        className=" z-10 hidden md:block left-0 top-1/2 transform text-black  -translate-y-1/2 p-4  bg-white  bg-opacity-80  rounded"
        onClick={prevImage}
      >
        <FaChevronLeft/>
      </button> */}
      {/* <img
        src={slides[currentImage].img}
        alt={`Slide ${currentImage + 1}`}
        className="h-full w-full object-cover"
      /> */}
      <div className='mt-80 px-4'>
        <p className='md:text-6xl text-4xl text-pink-500 font-bold'>{slides[currentImage].desc}</p>
        <p className='text-white text-lg'>{slides[currentImage].title}</p>
        </div>
        </div>
      {/* <button
        className="absolute hidden md:block md:right-0 top-1/2 transform text-black -translate-y-1/2 p-4  bg-white  bg-opacity-80  rounded"
        onClick={nextImage}
      >
        <FaChevronRight/>
      </button> */}

      </div>
  ); 
};

export default Slideshow;
