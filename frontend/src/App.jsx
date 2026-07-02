import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/footer'
import AuthSuccess from './pages/AuthSuccess'
import Profile from './pages/Profile'



const router = createBrowserRouter([
  {
    path: '/',
    element: <> <Navbar/> <Home/> <Footer/> </>
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
  {
    path: '/verify',
    element: <> <Verify/>  </>
  },
  {
    path: '/verify/:token',
    element: <> <VerifyEmail/>  </>
  },
  {
    path: '/profile',
    element: <>  <Navbar/> <Profile/>  </>
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