import React, { useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";


const Navbar = ({setQuery}) => {
  const { user, handleLogout} = useAuth();

  

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between  items-center">
      <div className="text-xl font-bold">
        <Link to="/">Noteapp</Link>
      </div>
      <input
        type="text"
        placeholder="Searchnotes"
        onChange={(e)=> setQuery(e.target.value)}
        className="bg-gray-600  px-4 py-2 rounded outline-none"
      />
      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500  px-4 py-2 rounded mr-4">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2  rounded mr-4"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
