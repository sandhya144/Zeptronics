import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'


const Navbar = () => {
  const user = true
  return (
    <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>
      {/* logo section  */}

      <div>
        <img src="/Ekart.png" alt='' className='w-[140px] rounded-4xl' />
      </div>
      {/* nav section */}
      <nav className='flex gap-10 justify-between items-center'>
        <ul className='flex gap-7 items-center text-xl font-semibold'>
          <Link to={'/'} className='text-blue-900'> Home </Link>
          <Link to={'/products'} className='text-blue-900' > Products </Link>
          {
            user && <Link to={'/profile'} className='text-blue-900' ><li> Hello User </li></Link>
          }
        </ul>
            <Link to={'/cart'} className='relative'> 
            <ShoppingCart/>
            <span className='bg-blue-900 rounded-full absolute text-white -top-3 -right-5 px-2'>0</span>
            </Link>
            {
              user ? <Button className='bg-blue-900 text-white cursor-pointer'>Logout</Button> : <Button className='bg-linear-to-tl from-blue-600 to-purple-600 text-white cursor-pointer' >Login</Button>
            }
      </nav>
      </div>
    </header>

  )
}

export default Navbar
