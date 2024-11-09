import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addpost from "./components/AddPost";
import Blogs from "./components/BlogList";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/AddPost" element={<Addpost />} />
        <Route path="/BlogList" element={<Blogs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;  

