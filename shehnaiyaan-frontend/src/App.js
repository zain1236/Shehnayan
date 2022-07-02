import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import Landing from "./Pages/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PostAd from "./Pages/PostAd/PostAd";
import Contact from "./Pages/Contact/Contact";
import Donate from "./Pages/Donate/Donate";
import Admin from "./Pages/Admin/Admin";
import Status from "./Pages/Status/Status";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="App w-screen min-h-screen flex flex-col  ">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/home" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/postAd" element={<PostAd />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/status" element={<Status />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
