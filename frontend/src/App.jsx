import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import { Toaster } from "react-hot-toast";
import Products from './pages/products/Products'
import Deals from './pages/deals/Deals'
import Contact from './pages/contact/Contact'
import Favorites from './pages/favorites/Favorites'
import About from './pages/about/About'
import Profile from './pages/profile/Profile'
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',  
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "profile", element: <Profile /> },
        { path: "products", element: <Products /> },
        { path: "deals", element: <Deals /> },
        { path: "contact", element: <Contact /> },
        { path: "favorites", element: <Favorites /> },
        { path: "about", element: <About /> },
      ]
    }
  ]);

  return (
    <>
      <Toaster 
        position="top-right"
        containerStyle={{
          top: '100px', // المسافة من الأعلى لتظهر تحت الناف بار مباشرة (n-top + n-bottom)
          zIndex: 10000 // أعلى من الناف بار (9999)
        }}
        toastOptions={{
          style: {
            zIndex: 10000,
            marginTop: '10px',
            position: 'relative'
          },
          duration: 3000,
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
