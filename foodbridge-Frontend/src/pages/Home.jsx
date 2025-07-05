import React from 'react'
import { Link } from "react-router-dom";
import donation1 from "../assets/donation1.png"
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { useEffect} from 'react';  
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';  //A-1(install aos)

const Home = () => {  //A-2
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
    let navigate=useNavigate(); //N-2
 

  return (
    <div >
      <div className=' bg-gradient-to-br from-white via-emerald-100 to-yellow-100 flex flex-col items-center lg:flex-row  lg:mt-[10px] pt-10 lg:gap-15 lg:pl-8 md:flex-col  md:mt-[2px]  md:py-10  md:gap-5   '>
 <div className="flex flex-col items-center justify-center  text-center px-4">
      

      {/* Hero Section */}
      <section className="mt-10 mb-16">
      <h1 data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="text-3xl md:text-3xl lg:text-5xl text-gray-800 font-bold bg-clip-text drop-shadow-lg tracking-wide animate-fade-in">
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
<div  className="bg-orange-800 hover:bg-orange-900 text-white font-bold shadow-md rounded-xl px-6 py-5 text-xl  tracking-wide transition-all hover:scale-105 hover:shadow-xl text-center" >
    <button className='flex gap-1.5 items-center justify-between cursor-pointer ' onClick={() => navigate("/donorlogin")}>
    Join as a Donor
    <BiSolidDonateHeart className="text-3xl text-yellow-100"  />
    </button>
 </div>

<button   
    className="bg-emerald-900 hover:bg-emerald-950 text-white shadow-md rounded-xl px-6 py-5 text-xl font-semibold tracking-wide transition-all hover:scale-105 hover:shadow-xl text-center cursor-pointer"onClick={()=>{navigate("/vollogin")}}>
   <div className='flex gap-1.5 items-center justify-between'>
    Join as a Volunteer
    <FaUserTie  className="text-3xl text-yellow-100" />
    </div>
  </button>
  
   <button  className='bg-sky-900 hover:bg-sky-950 text-white shadow-md rounded-xl px-6 py-5 text-xl font-semibold tracking-wide transition-all hover:scale-105 hover:shadow-xl text-center cursor-pointer'onClick={() => navigate("/reclogin")}>
    <div className='flex gap-1.5 items-center justify-between'>
    Join as a Recipient
    <FaHandsHelping  className="text-3xl text-yellow-100" />
    </div>
  </button>

  

</section>



    </div>
    {/* Image */}
<div  data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className='w-80 pt-8 h-auto lg:w-120 md:w-130 '>
    <img className='rounded-3xl' src={donation1} alt="donation1" />
</div>


    </div>
 {/* QUOTE SECTION */}
      <div  data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="bg-gradient-to-br from-green-50 via-emerald-100 to-yellow-50 py-16 px-6 md:px-20 rounded-3xl shadow-xl mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-semibold italic text-gray-800 leading-relaxed tracking-wide">
            “<span className="text-emerald-800 font-bold">Food is a basic human right.</span> When we waste it, we waste the chance to feed someone’s hope.”
          </p>
          <p className="mt-6 text-lg text-gray-600 font-medium">— Team FoodBridge</p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="py-16 px-6 md:px-16 bg-white rounded-3xl shadow-xl mb-20">
        <h2 className="text-4xl font-extrabold text-center text-emerald-800 mb-12 drop-shadow-md">How FoodBridge Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: "🍱", title: "1. Donate", desc: "Restaurants, households, or individuals submit food via our platform.", color: "orange" },
            { icon: "✅", title: "2. Store & Verify", desc: "Our team collects and checks food quality before safe storage.", color: "blue" },
            { icon: "🚚", title: "3. Distribute", desc: "Verified food is delivered to needy individuals across the city.", color: "green" }
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className={`bg-${color}-50 hover:shadow-lg transition-all border-l-4 border-${color}-400 rounded-xl p-6 text-center`}>
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className={`text-2xl font-bold text-${color}-700 mb-2`}>{title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* FINAL CALL TO ACTION */}
      <div className="text-center mb-10  mt-20 bg-gradient-to-r from-emerald-100 via-yellow-50 to-emerald-100 py-10 px-4 rounded-2xl shadow-md max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-4 tracking-wide drop-shadow">
          Join us in turning <span className="text-yellow-600">waste</span> into <span className="text-green-600">hope</span> 
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Every donation helps feed a soul and protect the planet.
          <br />
          <span className="text-green-700 font-medium">
            Let's make Mirpur hunger-free — together.
          </span>
        </p>
      </div>
</div>
  )
}

export default Home