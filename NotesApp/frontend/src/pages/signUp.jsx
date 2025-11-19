import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate() ; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await  axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
      });
      // console.log(response)  ; 
      if(response.data.success){
          localStorage.setItem("token" , response.data.token) ; 
           navigate('/') ; 
      }
    } catch (error) {
      console.log(error) ; 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6  w-96 bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-3 py-2 border"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-3 py-2 border"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="mb-5 cursor-pointer w-full bg-teal-600 text-white py-2"
            >
              Sign up
            </button>
            <p className="text-center">
              Already have an account ? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
