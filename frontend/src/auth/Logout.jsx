import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import { useContext } from 'react';

const Logout = () => {
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
    <button className="hover:text-blue-600"  onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;