import React from 'react'
import { useAuth } from '../components/context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar';

const AdminDashBoard = () => {
  const {user} = useAuth() ; 
  return (
      <div>
        <AdminSidebar/>
      </div>
  )
}

export default AdminDashBoard