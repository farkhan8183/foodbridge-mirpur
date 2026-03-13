import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Contact from "./pages/Contact";
import Login from "./pages/donor/DonorLogin";
import DonorPanel from "./pages/donor/donorpanel"; // Add this import
import VolunteerPanel from "./pages/volunteer/Volunteerpanel";
import VolunteerRegistration from "./pages/volunteer/VolunteerRegistration";
import VolunteerLogin from "./pages/volunteer/Volnteerlogin";
import DonorRegistration from "./pages/donor/DonorRegistration";
import DonorLogin from "./pages/donor/DonorLogin";
import RecipientLogin from "./pages/Recepient/RecipientLogin";
import RecipientRegistration from "./pages/Recepient/RecipientRegistration";
import RecipientPanel from "./pages/Recepient/recipientpanel";
import { userDataContext } from "./context/userContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
    let {userData} = useContext(userDataContext) 
  let location=useLocation()
  let Navigate=useNavigate()
  return (
  <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />

     <Route path="/donorregister" element={<DonorRegistration />} />
     <Route path="/donorlogin" element={<DonorLogin />} />
     <Route path="/volunteerregister" element={<VolunteerRegistration />} />
     <Route path="/volunteerlogin" element={<VolunteerLogin />} />
    <Route path="/recipientregister" element={<RecipientRegistration />} />
    <Route path="/recipientlogin" element={<RecipientLogin />} />
{/* Secure Panels: */}
 <Route path='/donorpanel' 
        element={userData ? <DonorPanel/> : <Navigate to="/donorlogin" state={{from: location.pathname}} /> }/>
   <Route path='/volunteerpanel' 
        element={userData ? <VolunteerPanel/> : <Navigate to="/volunteerlogin" state={{from: location.pathname}} /> }/>
     <Route path='/recipientpanel' 
        element={userData ? <RecipientPanel/> : <Navigate to="/recipientlogin" state={{from: location.pathname}} /> }/>   

    </Routes>
    
  );
}

export default App;