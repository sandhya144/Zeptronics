// import React from 'react'

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Verify from './pages/Verify'
// import VerifyEmail from './pages/VerifyEmail'
// import Footer from './components/footer'
// import AuthSuccess from './pages/AuthSuccess'
// import Profile from './pages/Profile'
// import Products from './pages/Products'
// import Cart from './pages/Cart'



// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <> <Navbar/> <Home/> <Footer/> </>
//   },
//   {
//     path: '/signup',
//     element: <> <Signup/> </>
//   },
//   {
//     path: '/auth-success',
//     element: <> <AuthSuccess/> </>
//   },
//   {
//     path: '/login',
//     element: <> <Login/>  </>
//   },
//   {
//     path: '/verify',
//     element: <> <Verify/>  </>
//   },
//   {
//     path: '/verify/:token',
//     element: <> <VerifyEmail/>  </>
//   },
//   {
//     path: '/profile/:userId',
//     element: <>  <Navbar/> <Profile/>  </>
//   },
//   {
//     path: 'products',
//     element: <>  <Navbar/> <Products/>  </>
//   },
//   {
//     path: 'cart',
//     element: <>  <Navbar/> <Cart/>  </>
//   },
// ])

// const App = () => {
//   return (
//     <>
//     <RouterProvider router={router} />
//     </>
//   )
// }

// export default App



import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/footer'
import AuthSuccess from './pages/AuthSuccess'
import Profile from './pages/Profile'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { setCart } from './redux/productSlice'

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
    path: '/profile/:userId',
    element: <>  <Navbar/> <Profile/>  </>
  },
  {
    path: 'products',
    element: <>  <Navbar/> <Products/>  </>
  },
  {
    path: 'cart',
    element: <>  <Navbar/> <Cart/>  </>
  },
])

const App = () => {
  const dispatch = useDispatch()
  const userState = useSelector((store) => store?.user) || {}
  const user = userState.user
  const accessToken = userState.accessToken

  useEffect(() => {
    let isCancelled = false
    console.log("EFFECT RUNNING - user:", user, "token:", accessToken)

    const fetchCart = async () => {
      if (!user || !accessToken) {
        console.log("SKIPPED FETCH - no user/token")
        return
      }
      try {
        const res = await axios.get("http://localhost:8000/api/v1/cart", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        console.log("CART RESPONSE:", JSON.stringify(res.data))
        if (!isCancelled && res?.data?.success) {
          dispatch(setCart(res.data.cart))
          console.log("DISPATCHED setCart with:", JSON.stringify(res.data.cart))
        }
      } catch (error) {
        console.log("FETCH FAILED:", error)
      }
    }

    fetchCart()

    return () => {
      isCancelled = true
    }
  }, [user, accessToken, dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App;