import React from "react";
import { useAuth } from "../components/context/authContext";
import EmployeeSidebar from "../components/EmployeeDashboard/EmployeeSidebar";
import Navbar from  "../components/dashboard/Navbar"
import { Outlet } from "react-router-dom";



const EmployeeDashBoard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <EmployeeSidebar/>
      <div className="flex-1 ml-80 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
