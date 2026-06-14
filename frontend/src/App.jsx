import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthSuccess from './pages/AuthSuccess'


const router = createBrowserRouter([
  {
    path: '/',
    element: <> <Navbar/> <Home/> </>
  },
  {
    path: '/signup',
    element: <> <Signup/> </>
  },
  {
    path: '/auth-success',
    element: <> <AuthSuccess/> </>
  },
  {
    path: '/login',
    element: <> <Login/>  </>
  },
])

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App