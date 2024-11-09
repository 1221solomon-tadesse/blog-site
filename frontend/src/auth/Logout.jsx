import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    window.localStorage.setItem("isloggedIn",false)
    navigate('/Home');
  };

  return (
     <button className="nav-item logout-btn" onClick={handleLogout} style={{
      position: "absolute",
  top: "10px",
  right: "10px", 
  backgroundColor : "E8AF3C",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease"
    }}>
      Logout
    </button>
  );
};

export default Logout;