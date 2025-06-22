// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Mission", to: "/mission" },
  { name: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  function handleclick() {
    nav("/");
    setIsMenuOpen(false);
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-archer-50 text-white shadow-lg">
      {/* Changed to flex-col on mobile to stack logo and nav vertically */}
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        
        {/* Logo and hamburger button row - shown on all screens */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <img 
            src={logo}
            alt="FoodBridge Logo"
            className="w-35 h-auto transition-transform duration-500 hover:scale-105 cursor-pointer"
            onClick={handleclick}
          />

          {/* Hamburger button - only shown on mobile */}
          <button
            className="md:hidden text-black text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Navigation links - shown below logo on mobile when open */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            {links.map(({ name, to }) => (
              <li key={name}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `relative block px-2 py-1 text-xl md:text-2xl font-semibold transition-transform duration-300
                    ${isActive ? "text-black" : "text-black hover:text-yellow-500 hover:scale-105"}
                    `
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-1 bg-yellow-500
                      transition-all duration-300
                      ${location.pathname === to ? "w-full" : "w-0"}
                    `}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;