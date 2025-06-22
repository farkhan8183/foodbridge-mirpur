import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

function Navbar1() {
    function handleclick() {
    nav("/");
    setIsMenuOpen(false);
  }
  return (
<>
 
      
    <div className="container bg-white lg:h-[180px] h-[160px] lg:w-full  lg:flex lg:flex-row flex flex-col gap-7  px-6 sm:px-10 md:px-12 py-5 ">

       {/* Logo Icon */}
        <div className="flex items-center gap-2 scale-150 origin-left">
            <img 
                      src={logo}
                      alt="FoodBridge Logo"
                      className="lg:w-20 w-15 ml-[65px] mt-3 h-auto transition-transform duration-500 hover:scale-105 cursor-pointer"
                      onClick={handleclick}
                    />
        </div>
        
        {/* nav bar */}
<div className="lg:ml-25 lg:mt-20 lg:text-[30px] text-1xl font-bold lg:font-bold">
  <ul className="flex space-x-6 ">
    <li>
      <NavLink
        to="/"
        end
     className={({ isActive }) =>
          `relative text-gray-700 transition-colors duration-300  px-2 py-1
           hover:text-blue-800 hover:font-extrabold
           ${isActive ? "text-blue-700 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-yellow-600 after:rounded-full after:transition-all after:duration-300" : ""}`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/about"
       className={({ isActive }) =>
          `relative text-gray-700 transition-colors duration-300  px-2 py-1
           hover:text-blue-800 hover:font-extrabold
           ${isActive ? "text-blue-950 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-yellow-600 after:rounded-full after:transition-all after:duration-300" : ""}`
        }
      >
        About
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/mission"
        className={({ isActive }) =>
          `relative text-gray-700 transition-colors duration-300  px-2 py-1
          hover:text-blue-800 hover:font-extrabold
           ${isActive ? "text-blue-950 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-yellow-600 after:rounded-full after:transition-all after:duration-300" : ""}`
        }
      >
        Mission
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `relative text-gray-700 transition-colors duration-300  px-2 py-1
          hover:text-blue-800 hover:font-extrabold
           ${isActive ? "text-blue-700 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[3px] after:bg-yellow-600 after:rounded-full after:transition-all after:duration-300" : ""}`
        }
      >
        Contact
      </NavLink>
    </li>
    
  </ul>
</div>


      </div>
    

    </>
  );
}

export default Navbar1;