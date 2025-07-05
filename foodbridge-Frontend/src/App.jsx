import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import  Footer  from  "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Contact from "./pages/Contact";
import Login from "./pages/donor/DonorLogin";
import DonorPanel from "./pages/donor/DonorPanel"; // Add this import
import Reclogin from "./pages/Recepient/RecipientLogin";
import Vollogin from "./pages/volunteer/volunteer";

function MainLayout() {   // this will always show navbar at top 
  return (
    <>
      <Navbar />    
      <Outlet />
       <Footer/>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout wraps all pages that need Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
        </Route>


        {/* These pages won't show Navbar (login pages and dashboards) */}
        <Route path="/donorlogin" element={<Login />} />
        <Route path="/donorpanel" element={<DonorPanel />} />
        <Route path="/reclogin" element={<Reclogin />} />
        <Route path="/vollogin" element={<Vollogin />} />
      </Routes>
    </Router>
  );
}

export default App;