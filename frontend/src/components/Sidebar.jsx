import { LayoutDashboard, PackagePlus, PackageSearch, User, Users } from 'lucide-react'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='hidden fixed md:block border-r bg-gray-100 border-[#0EA5B4] x-10 w-[300px] p-10 space-y-2 h-screen'>
      <div className='text-center pt-10 px-3 space-y-2'>
        <NavLink to='/dashboard/sales' className={({isActive}) => `text-xl ${isActive ? " bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-gray-100":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full` }> <LayoutDashboard/> <span>Dashboard</span> </NavLink>

         <NavLink to='/dashboard/add-product' className={({isActive}) => `text-xl ${isActive ? " bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-gray-100":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full` }> <PackagePlus/> <span>Add Product</span> </NavLink>

          <NavLink to='/dashboard/products' className={({isActive}) => `text-xl ${isActive ? " bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-gray-100":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full` }> <PackageSearch /> <span>Products</span> </NavLink>

           <NavLink to='/dashboard/users' className={({isActive}) => `text-xl ${isActive ? " bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-gray-100":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full` }> <Users/> <span>User</span> </NavLink>

           <NavLink to='/dashboard/orders' className={({isActive}) => `text-xl ${isActive ? " bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-gray-100":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full` }> <FaRegEdit/> <span>Orders</span> </NavLink>

            
      </div>
    </div>
  )
}

export default Sidebar
