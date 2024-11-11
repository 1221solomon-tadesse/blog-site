import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import logo from "../assets/logo.jpg";
import Logout from "../auth/Logout";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleStorageChange = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Headroom>
      <main>
        <div className="text-center bg-black text-white p-5 w-full">
          <ul className="flex justify-around items-center text-xl">
            <img src={logo} alt="Logo" className="w-20 rounded-md" />

            {isLoggedIn ? (
              <>
                <Link to="/AddPost" className="hover:text-blue-600">
                  Add Post
                </Link>
                <Link to="/BlogList" className="hover:text-blue-600">
                  Blog List
                </Link>
                <Link to="/Mypost" className="hover:text-blue-600">
                  My post
                </Link>
              </>
            ) : (
              <Link to="/Home" className="hover:text-blue-600">
                Home
              </Link>
            )}
            {isLoggedIn ? (
              <Logout />
            ) : (
              <Link to="/Login" className="hover:text-blue-600">
                Login
              </Link>
            )}
          </ul>
        </div>
      </main>
    </Headroom>
  );
};

export default Navbar;
