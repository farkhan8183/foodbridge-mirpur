import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar1() {
  const nav = useNavigate();

  function handleClick() {
    nav("/");
  }

  return (
 <div className="w-full bg-gradient-to-r from-emerald-200 via-white to-yellow-100 shadow-md">

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 py-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleClick}>
          <img
            src={logo}
            alt="FoodBridge Logo"
            className="w-20 lg:w-24 transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Nav Links */}
        <ul className="flex flex-wrap justify-center lg:justify-end gap-6 mt-4 lg:mt-0 text-lg lg:text-xl font-semibold">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/mission", label: "Mission" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `relative text-gray-700 transition duration-300 hover:text-blue-800 hover:font-bold ${
                    isActive
                      ? "text-blue-700 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-yellow-500 after:rounded-full"
                      : ""
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar1;
