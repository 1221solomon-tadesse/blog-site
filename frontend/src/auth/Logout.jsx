import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    window.localStorage.setItem("isloggedIn",false)
    navigate('/');
  };
  return (
    <button className="hover:text-blue-600"  onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;