import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import { useContext } from 'react';
import { useLocation } from "react-router-dom";


const Logout = () => {
   const location = useLocation();
   const pathname = location.pathname;
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    // window.localStorage.setItem("isloggedIn",false)
    
    setIsLoggedIn(false);
    navigate('/');
  };
  return (
    <button
      to="/Logout"
      className={`${
        pathname === "/Logout" ? "bg-black" : ""
      } text-white hover:bg-gray-900 rounded-md px-4 py-2`}
    ></button>
  );
};

export default Logout;