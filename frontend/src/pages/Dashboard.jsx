
import Sidebar from '../components/Sidebar';
import React from 'react'
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="min-h-screen">

      <Sidebar className='bg-[#F8FAFC]' />

      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
};

export default Dashboard



