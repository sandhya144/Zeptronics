import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../redux/userslice'
import axios from 'axios';
import { toast } from "sonner";
import { persistor } from '../redux/store'
import { clearCart } from '../redux/productSlice'


const Navbar = () => {
  const {user} = useSelector((store)=> store.user)
 
  const {cart} = useSelector((store) => store.product)

  const accessToken = localStorage.getItem('accessToken')

  const admin = user?.role === "admin" ? true : false;

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const logoutHandler = async () => {
  try {
    const res = await axios.post('http://localhost:8000/api/v1/user/logout', {}, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (res.data.success) {
      dispatch(logout());          // clear user slice
      dispatch(clearCart());       // clear cart slice
      localStorage.removeItem('accessToken');   // ← THIS LINE — you're still missing it 
      toast.success(res.data.message);
      navigate('/login');          // avoid stale UI on current page
    }
  } catch (error) {
    console.log(error);
  }
}


  return (
    <header className='bg-gray-50 fixed w-full z-20 border-b border-blue-300'>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center py-3'>
        
        {/* Logo Section */}
        <div>
          <img src='/Ekart (1).svg' alt='Zeptronics Logo' className='w-38 object-contain rounded-4xl' />
        </div>
       
        {/* Nav Section */}
        <nav className='flex gap-8 items-center'>
          
          {/* Properly structured list */}
          <ul className='flex gap-7 items-center text-xl font-semibold'>
            <li>
              <Link to={'/'} className='text-[#1E85C7] text-xl'>Home</Link>
            </li>
            <li>
              <Link to={'/products'} className='text-[#1E85C7] text-xl'>Products</Link>
            </li>
            {user && (
              <li>
                <Link to={`/profile/${user._id}`} className='text-[#1E85C7]'>Hello, {user.firstName} </Link>
              </li>
            )}

            {admin && (
              <li>
                <Link to={`/dashboard/sales`} className='text-[#1E85C7]'>Dashboard</Link>
              </li>
            )}
          </ul>
        
          {/* Cart Icon with inline-flex to anchor the badge correctly */}
          <Link to={'/cart'} className='relative inline-flex items-center justify-center p-1 text-blue-900'> 
            <ShoppingCart className='w-6 h-6' />
            <span className='bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] rounded-full absolute text-white text-xs -top-1 -right-2 px-1.5 min-w-5 h-5 flex items-center justify-center font-bold'>
              { cart?.items?.length || 0 }
            </span>
          </Link>

          {/* Action Button */}
          {user ? (
            <Button onClick={logoutHandler} className='bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-white cursor-pointer px-4 py-2 rounded-md'>Logout</Button>
          ) : (
            <Button onClick={()=> navigate('/login')} className='bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-white cursor-pointer px-4 py-2 rounded-md'>Login</Button>
          )}
        </nav>

      </div>
    </header>
  )
}

export default Navbar