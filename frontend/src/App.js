import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addpost from "./components/AddPost";
import Blogs from "./components/BlogList";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Mypost from "./components/Mypost";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext"; // Import UserProvider

function App() {
  return (
    <UserProvider>
      {" "}
      {/* Wrap with UserProvider */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          {/* Protected Routes for authenticated users only */}
          <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
            <Route path="/AddPost" element={<Addpost />} />
            <Route path="/BlogList" element={<Blogs />} />
            <Route path="/Mypost" element={<Mypost />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
