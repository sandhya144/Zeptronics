import { Input } from '@/components/ui/input';
import { Edit, Eye, Search, Users2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import UserLogo from '../../assets/user.jpg';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminUser = () => {

const[users,setusers] = useState([]);
const[searchTerm, setSearchTerm] = useState("")
const navigate = useNavigate()

const getAllUsers = async () =>{
  const accessToken = localStorage.getItem("accessToken")

  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/all-user`, 
      {
        headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })

    if(res.data.success){
      setusers(res.data.users);
    }
  } catch (error) {
    console.log(error);
  }
}

const filteredUser = users.filter(user=>
  `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
)



useEffect(()=> {
  getAllUsers()
},[])


  return (
    <div className='pl-[350px] py-20 pr-20 mx-auto px-4'>
      <h1 className='font-bold text-2xl'>User Management</h1>
      <p>View and manage registered users</p>
      <div className='flex relative w-[300px] mt-6'>
        <Search className='absolute left-2 top-1 text-gray-600 w-5' />
        <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" placeholder="Search Users..." />
      </div>
      <div className='grid grid-cols-3 gap-7 mt-7'>
        {
          filteredUser.map((users,index)=>{
            return (
            <div key={index} className='bg-gray-200 p-5 rounded-lg'>
              <div className='flex items-center gap-2'>
                <img src={users?.profilePic || UserLogo} alt="" className='rounded-full w-16 aspect-square object-cover border-pink-600'/>
              </div>
              <div>
                <h1 className='font-semibold'>
                  {users?.firstName} {users.lastName}
                </h1>
                <h3>{users?.email}</h3>
              </div>

               <div className='flex gap-3 mt-3' >
                <Button onClick={()=>navigate(`/dashboard/users/${users?._id}`)} variant='outline'className='cursor-pointer'> <Edit/> Edit </Button>
                <Button onClick={()=>navigate(`/dashboard/users/orders/${users?._id}`)}  className='bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4]  cursor-pointer'><Eye/>Show Orders</Button>
           </div>
            
          </div>

          

            )
           })
        }

      </div>
    </div>
  )
}

export default AdminUser
