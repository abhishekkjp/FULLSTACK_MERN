import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../context/authContext";

const EmployeeSidebar = () => {
    const {user} = useAuth() ; 
    console.log(user._id) ; 
  return (
    <div className="bg-gray-800 text-white  h-screen fixed left-0 top-0 bottom-0  space-y-2 w-80">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-serif">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/employee-dashboard"
          className={({isActive}) =>   `${isActive ? "bg-teal-500" : ""} text-2xl flex items-center  space-x-4  py-2.5 px-10 rounded`}
          end
       >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({isActive}) =>   `${isActive ? "bg-teal-500" : ""} text-2xl flex items-center  space-x-4  py-2.5 px-10 rounded`}
          end        >
          <FaUser />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/leaves"
          className={({isActive}) =>   `${isActive ? "bg-teal-500" : ""} text-2xl flex items-center  space-x-4  py-2.5 px-10 rounded`}
          end
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard"
          className="text-2xl flex items-center space-x-4  py-2.5 px-10 rounded"
        >
          <FaCalendarAlt />
          <span>Salary</span>
        </NavLink>
        {/* <NavLink
          to="/employee-dashboard/salary"
          className={({isActive})=> `${isActive ? "bg-teal-500": ""} text-2xl flex items-center space-x-4  py-2.5 px-10 rounded ` }
          end
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink> */}
        <NavLink
          to="/employee-dashboard/setting"
          className="text-2xl flex items-center space-x-4  py-2.5 px-10 rounded"
        >
          <FaCogs />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
