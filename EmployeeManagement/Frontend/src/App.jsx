import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import EmployeeDashBoard from "./pages/EmployeeDashBoard";
import PrivateRoutes from "./utils/privateRoutes";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/addDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from './components/employee/view'
import Edit from "./components/employee/Edit";
import AddSalary from './components/salary/Add'
import SalaryView from "./components/salary/SalaryView";
import Summary from "./components/EmployeeDashboard/Summary";
import Profile from "./components/EmployeeDashboard/Profile";
import LeaveList from './components/leave/List'
import AddLeave from './components/leave/Add'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/admin-dashboard"
        element={
          <RoleBasedRoute  requiredRole={["admin"]}>
            <PrivateRoutes>
              <AdminDashBoard />
            </PrivateRoutes>
          </RoleBasedRoute>
        }
      >
        <Route index element={<AdminSummary/>}></Route>
        <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
        <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
        <Route path="/admin-dashboard/employees" element={<List/>}></Route>
        <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
        <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
        <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
        <Route path="/admin-dashboard/employees/salary/:id" element={<SalaryView/>}></Route>
        <Route path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>
      </Route>



      <Route path="/employee-dashboard" element={  
        <PrivateRoutes>
           <RoleBasedRoute requiredRole={['admin' , 'employee']}>
          <EmployeeDashBoard/>
           </RoleBasedRoute>
        </PrivateRoutes>
        }>
       <Route index element={<Summary/>}></Route>
       <Route path='/employee-dashboard/profile/:id' element={<View/>}></Route>
       <Route path='/employee-dashboard/leaves' element={<LeaveList/>}></Route>
       <Route path='/employee-dashboard/add-leave' element={<AddLeave/>}></Route>

      </Route>
    </Routes>
  );
};

export default App;
