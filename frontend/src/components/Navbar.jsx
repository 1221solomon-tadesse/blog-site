import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import logo from "../assets/logo.jpg";
import Logout from "../auth/Logout";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleStorageChange = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <Headroom>
      <main>
        <div className="text-center bg-black text-white p-5 w-full">
          <div className="flex justify-between items-center">
            <img src={logo} alt="Logo" className="w-20 rounded-md" />
            <button className="md:hidden" onClick={toggleNavbar}>
              {isNavbarOpen ?< FaTimes/>:< FaBars/> }
            </button>
          </div>
          <ul
            className={`flex-col md:flex-row md:flex justify-around items-center text-xl ${
              isNavbarOpen ? "block" : "hidden md:flex"
            }`}
          >
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/AddPost" className="hover:text-blue-600">
                    Add Post
                  </Link>
                </li>
                <li>
                  <Link to="/BlogList" className="hover:text-blue-600">
                    Blog List
                  </Link>
                </li>
                <li>
                  <Link to="/Mypost" className="hover:text-blue-600">
                    My Post
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
            )}
            <li>
              {isLoggedIn ? (
                <Logout />
              ) : (
                <Link to="/Login" className="hover:text-blue-600">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </main>
    </Headroom>
  );
};

export default Navbar;
