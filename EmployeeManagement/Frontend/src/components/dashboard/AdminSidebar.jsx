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

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white  h-screen fixed left-0 top-0 bottom-0  space-y-2 w-80">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-serif">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({isActive}) =>   `${isActive ? "bg-teal-500" : ""} text-2xl flex items-center  space-x-4  py-2.5 px-10 rounded`}
          end
       >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({isActive}) =>   `${isActive ? "bg-teal-500" : ""} text-2xl flex items-center  space-x-4  py-2.5 px-10 rounded`}
          end        >
          <FaUser />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({isActive}) =>   `${isActive ? "bg-teal-500" : ""} text-2xl flex items-center  space-x-4  py-2.5 px-10 rounded`}
          end
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="text-2xl flex items-center space-x-4  py-2.5 px-10 rounded"
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="text-2xl flex items-center space-x-4  py-2.5 px-10 rounded"
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="text-2xl flex items-center space-x-4  py-2.5 px-10 rounded"
        >
          <FaCogs />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
