import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import EmployeeDashBoard from "./pages/EmployeeDashBoard";
import PrivateRoutes from "./utils/privateRoutes";
import RoleBasedRoute from "./utils/RoleBasedRoute";

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
      ></Route>
      <Route path="/employee-dashboard" element={<EmployeeDashBoard />}></Route>
    </Routes>
  );
};

export default App;
