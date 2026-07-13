import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const ProtectedRoutes = ({
  children,
  adminOnly = false,
  userOnly = false,
}) => {
  const { user } = useSelector((store) => store.user);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Only admins can access
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Only normal users can access
//   if (userOnly && user.role === "admin") {
//     return <Navigate to="/login" replace />;
//   }

  return children;
};

export default ProtectedRoutes;