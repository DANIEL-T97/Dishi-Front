
import React, { useEffect, useState } from 'react'




import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Homepage from './pages/Homepage'
import Aboutpage from './pages/Aboutpage'
import Login from './useractions/Login'
import SignUp from './useractions/SignUp'
import CategoryPage from './components/Category Page'
import Categories from './components/Categories'
import Recipepage from './pages/Recipepage'
import Mealplans from './pages/Mealplans'
import axios from 'axios';
import UserPage from './pages/UserPage'
import Checkout from './pages/Checkout'
import PrivateRoute from './private/PrivateRoute'
import Favouritepage from './pages/Favouritepage'
import ConfirmPage from './pages/ConfirmPage'






function App() {
  
  return (
  <BrowserRouter>
  <Routes>

    {/* routes with navbar &footer */}
    
    <Route path='/' element={<Layout/>}>
      <Route path='/' index element={<Homepage/>}/>
      <Route path='/about' element={<Aboutpage/>}/>
      <Route path='/recipe/:id' element={<Recipepage/>}/>
      <Route path='/mealplans' element={<Mealplans/>}/>
      {/* Use PrivateRoute for protected routes */}
      {/* <Route path="/user/*" element={<PrivateRoute />}>
          <Route path="dashboard" element={<UserPage />} />
          <Route path="favourites" element={<Favouritepage />} />
        </Route> */}
        <Route path='/user/*' element={<PrivateRoute/>}>
        <Route path="dashboard" element={<UserPage />} />
        <Route path="favourites" element={<Favouritepage />} />
        </Route>
        

      
      <Route path='/mealplan/checkout/:id' element={<Checkout/>}/>
      <Route path="/" element={<Categories />} />
      <Route path="/category/:category" element={<CategoryPage />} />
    </Route>
    
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/confirm/:email' element={<ConfirmPage/>}/>
    

  </Routes>
  </BrowserRouter>
  )
}

export default App;
