import React from 'react'
import { Link } from "react-router-dom";
import donation1 from "../assets/donation1.png"
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";

const Home = () => {
  return (
    <div >
      <div className=' bg-gradient-to-br from-white via-emerald-100 to-yellow-100 flex flex-col items-center lg:flex-row  lg:mt-[10px] pt-10 lg:gap-15 lg:pl-8 md:flex-col  md:mt-[2px]  md:py-10  md:gap-5   '>
 <div className="flex flex-col items-center justify-center  text-center px-4">
      
      {/* Hero Section */}
      <section className="mt-10 mb-16">
      <h1 className="text-3xl md:text-3xl lg:text-5xl text-gray-800 font-bold bg-clip-text drop-shadow-lg tracking-wide animate-fade-in">
    Welcome to <span className='font-extrabold text-blue-950 '>FoodBridge Mirpur</span>
  </h1>
        <p className="pt-4 text-lg md:text-xl text-gray-950 max-w-2xl mx-auto leading-relaxed tracking-wide">
  We take extra food from restaurants and give it to people who need it. <br className="hidden md:block" />
  <span className="text-green-700 font-semibold">
    Help us feed people instead of wasting food.
  </span>
</p>
      </section>

      {/* Join Buttons */}
   <section className="grid grid-cols-1  gap-6 mt-5 px-4">
  <Link
    to="/donor/signup"
    className="bg-orange-800 hover:bg-orange-900 text-white font-bold shadow-md rounded-xl px-6 py-5 text-xl  tracking-wide transition-all hover:scale-105 hover:shadow-xl text-center"
  >
    <div className='flex gap-1.5 items-center justify-between'>
    Join as a Donor
    <BiSolidDonateHeart className="text-3xl text-yellow-100" />
    </div>
  </Link>

  <Link
    to="/recipient/signup"
    className="bg-sky-900 hover:bg-sky-950 text-white shadow-md rounded-xl px-6 py-5 text-xl font-semibold tracking-wide transition-all hover:scale-105 hover:shadow-xl text-center"
  >
    <div className='flex gap-1.5 items-center justify-between'>
    Join as a Recipient
    <FaHandsHelping  className="text-3xl text-yellow-100" />
    </div>
  </Link>

  <Link
    to="/employee/signup"
    className="bg-emerald-900 hover:bg-emerald-950 text-white shadow-md rounded-xl px-6 py-5 text-xl font-semibold tracking-wide transition-all hover:scale-105 hover:shadow-xl text-center"
  >
   <div className='flex gap-1.5 items-center justify-between'>
    Join as a Volunteer
    <FaUserTie  className="text-3xl text-yellow-100" />
    </div>
  </Link>
</section>



    </div>
    {/* Image */}
<div className='w-80 pt-8 h-auto lg:w-120 md:w-130 '>
    <img className='rounded-3xl' src={donation1} alt="donation1" />
</div>

    </div>


</div>
  )
}

export default Home