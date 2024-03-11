
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoFastFoodSharp } from 'react-icons/io5';
import { useAuth } from '../useractions/Authcontext';
import { MdMenu } from 'react-icons/md';

const Navbar = ({searchTerm, setSearchTerm, handleSearch, setShowResults}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false)


  const onOpenSearch = () => {
    setSearchOpen((prevSearchOpen) => !prevSearchOpen);
  };

  const menuItems = [
    { path: '/', Link: 'Home' },
    { path: '/about', Link: 'About' },
    { path: '/mealplans', Link: 'Mealplans' },
    { path: '/user/favourites', Link: 'Favourites' },
  ];

  const handleClickLogin = () => {
    login();
    navigate('/login');

  };

  const handleClickSignup = () => {
    navigate('/signup');
  };
  const handleLogout = () => {
    
    logout(); 
    navigate('/'); 
  };

  

  return (
    <nav onClick={()=>setShowResults(false)} className='shadow-md md:px-8 px-4 relative '>
      <div className='py-8 md:w-1/3 mx-auto'>
        <Link to={'/'}>
          <h1 className='text-4xl ml-8 font-extrabold font-dancing-script flex items-center text-center'>
          Dishi-Tamu
          <IoFastFoodSharp className='text-pink-500' />
        </h1>
        </Link>
      </div>
      <div className='flex justify-between items-center py-2 md:hidden'>
      <div className='w-5/6  md:block'>
          {searchOpen && (
            <form onSubmit={handleSearch}   className='flex border-pink-500 border-2 p-1 rounded-full pl-2  items-center '>
              <input 
              className='w-3/4 py-1 focus:outline-none ' 
              value={searchTerm} 
              onChange={(e)=>setSearchTerm(e.target.value)} 
              type='text' />
              <button
                className='bg-pink-500 text-white font-medium rounded-full flex gap-1 items-center  px-2 py-1 '
                type='submit'
              >
                <FaSearch /> Search
              </button>
            </form>
          )}
          <button
            onClick={onOpenSearch}
            className={` ${searchOpen ? 'hidden' : 'flex'} gap-1 items-center  px-2 py-1 rounded`}
            type='submit'
          >
            <FaSearch />
          </button>
        </div>
        <MdMenu onClick={()=>setMenuOpen(!menuOpen)} size={32}/>
      </div>

      <div className='hidden md:flex items-center gap-12 justify-between'>
        <div className='w-1/4  md:block'>
          {searchOpen && (
            <form onSubmit={handleSearch} className='flex border-pink-500 border-2 p-1 rounded-full pl-2  items-center '>
              <input
              value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='w-3/4 py-1 focus:outline-none ' type='text' />
              <button
                className='bg-pink-500 text-white font-medium rounded-full flex gap-1 items-center  px-2 py-1 '
                type='submit'
              >
                <FaSearch /> Search
              </button>
            </form>
          )}
          <button
            onClick={onOpenSearch}
            className={` ${searchOpen ? 'hidden' : 'flex'} gap-1 items-center  px-2 py-1 rounded`}
            type='submit'
          >
            <FaSearch />
          </button>
        </div>

        <div className='w-1/2  md:flex justify-between mx-auto py-4'>
          {menuItems.map((Item) => (
            <Link key={Item.Link} to={Item.path}>
              {Item.Link}
            </Link>
          ))}
        </div>

        <div className='md:w-1/4  flex justify-end gap-4'>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/user/dashboard')}
                className='px-4 py-1 rounded text-lg font-medium text-white bg-pink-500 flex items-center gap-2'
              >
                <FaUser size={16}/>
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className='border-2 font-medium border-pink-500 px-4 rounded text-pink-500 text-lg py-1'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleClickLogin}
                className='px-4 py-1 rounded text-lg font-medium text-white bg-pink-500'
              >
                Login
              </button>
              <button
                onClick={handleClickSignup}
                className='border-2 font-medium border-pink-500 px-4 rounded text-pink-500 text-lg py-1'
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      {/*  */}
      {menuOpen && (
      <div>
      <div className='absolute shadowy z-100 right-0 top-full rounded-lg bg-white   w-3/4 '>
      <div className=' p-8 grid gap-4 mx-auto py-4'>
          {menuItems.map((Item) => (
            <Link key={Item.Link} onClick={()=>setMenuOpen(false)} to={Item.path}>
              {Item.Link}
            </Link>
          ))}
          <div className='grid grid-cols-2 gap-4 text-white font-medium '>
           <Link to={'/signup'}>
            <button className='bg-pink-500 px-4 py-2 rounded'>Sign Up</button>
            </Link>
            <Link to={'/login'}>
              <button className='bg-pink-500 px-4 py-2 rounded'>Login</button>
              </Link>
          </div>
        </div>

      </div>
      </div>
      )}

      {/* <div className='absolute  top-0 right-0 w-full h-full bg-black bg-opacity-35'></div> */}
    </nav>
  );
};

export default Navbar;
