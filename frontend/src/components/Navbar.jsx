import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import { UserContext } from "../contexts/UserContext";
import Logout from "../auth/Logout";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { isLoggedIn } = useContext(UserContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <Headroom>
      <main>
        <div className="text-center bg-blue-600 text-white p-5 md:w-full">
          <div className="flex justify-between items-center">
            <h1>LOGO</h1>
            <button className="md:hidden" onClick={toggleNavbar}>
              {isNavbarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <ul
            className={`flex flex-col md:flex-row md:flex justify-around items-center text-xl ${
              isNavbarOpen ? "block text-left w-1/2" : "hidden md:flex"
            }`}
          >
            {isLoggedIn ? (
              <>
                <li className="mb-4 md:mb-0">
                 
                  <Link
                    to="/AddPost"
                    className={`${
                      pathname === "/AddPost" ? "bg-black" : ""
                    } text-white hover:bg-gray-900 rounded-md px-4 py-2`} 
                  >
                    Add Post
                  </Link>
                </li>
                <li className="mb-4 md:mb-0">
                 
                  <Link
                    to="/BlogList"
                    className={`${
                      pathname === "/BlogList" ? "bg-black" : ""
                    } text-white hover:bg-gray-900 rounded-md px-4 py-2`} 
                  >
                    Blog List
                  </Link>
                </li>
                <li className="mb-4 md:mb-0">
                 
                  <Link
                    to="/Mypost"
                    className={`${
                      pathname === "/Mypost" ? "bg-black" : ""
                    } text-white hover:bg-gray-900 rounded-md px-4 py-2`} 
                  >
                    My Post
                  </Link>
                </li>
                <li>
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li className="mb-4 md:mb-0">
                 
                  <Link
                    to="/"
                    className={`${
                      pathname === "/" ? "bg-black" : ""
                    } text-white hover:bg-gray-900 rounded-md px-4 py-2`} 
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-4 md:mb-0">
              
                  <Link
                    to="/Login"
                    className={`${
                      pathname === "/Login" ? "bg-black" : ""
                    } text-white hover:bg-gray-900 rounded-md px-4 py-2`} 
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </main>
    </Headroom>
  );
};

export default Navbar;
