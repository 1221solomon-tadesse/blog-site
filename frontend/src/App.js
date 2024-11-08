import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addpost from "./components/AddPost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Home />} />
        <Route path="/AddPost" element={<Addpost />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
