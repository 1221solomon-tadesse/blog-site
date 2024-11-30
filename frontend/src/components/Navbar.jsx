import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import { UserContext } from "../contexts/UserContext"; 
import Logout from "../auth/Logout";

const Navbar = () => {
  const { isLoggedIn } = useContext(UserContext); 
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <Headroom>
      <main>
        <div className="text-center bg-gray-800 text-white p-5  md:w-full">
          <div className="flex justify-between items-center ">
            <h1>LOGO</h1>
            <button className="md:hidden" onClick={toggleNavbar}>
              {isNavbarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <ul
            className={`flex-col md:flex-row  md:flex justify-around items-center text-xl ${
              isNavbarOpen ? "block text-left w-1/2" : "hidden md:flex"
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
                <li>
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/Login" className="hover:text-blue-600">
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
