
import Sidebar from '../components/Sidebar';
import React from 'react'
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className='flex'>

      {/* sidebar */}
      <Sidebar className='bg-[#F8FAFC]' />
    
      <div className='flex-1'>
      <Outlet />
      </div>

      </div>
  );
};

export default Dashboard
