import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import Orders from './pages/Orders/Orders'
import Users from './pages/Users/Users'
import Analytics from './pages/Analytics/Analytics'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ErrorPage from './pages/Error/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const basename = process.env.NETLIFY ? '' : '/eliete-stpro/admin'
  
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <ErrorPage />
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'products', element: <Products /> },
        { path: 'orders', element: <Orders /> },
        { path: 'users', element: <Users /> },
        { path: 'analytics', element: <Analytics /> },
        { path: 'settings', element: <Settings /> },
      ]
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ], {
    basename: basename
  })

  return <RouterProvider router={router} />
}

export default App
