import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import EmployeeDashBoard from "./pages/EmployeeDashBoard";
import PrivateRoutes from "./utils/privateRoutes";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";

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
      </Route>
      <Route path="/employee-dashboard" element={<EmployeeDashBoard />}></Route>
    </Routes>
  );
};

export default App;
