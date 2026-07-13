import Navbar from '@/components/Navbar';
import React from 'react'
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <>
      <Navbar/>

      {/* sidebar */}

      <Outlet />
    </>
  );
};

export default Dashboard
