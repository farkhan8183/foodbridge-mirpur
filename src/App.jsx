import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Contact from "./pages/Contact";
import Work from "./pages/How-it-works";

function App() {
  return (
    <div className="w-full">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<Work/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
