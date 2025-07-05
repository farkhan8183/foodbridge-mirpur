import React, { useEffect } from 'react';  
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-100 to-yellow-100 px-6 py-12 lg:px-24">

     
   {/* ABOUT SECTION */}
<div
  className="flex flex-col-reverse lg:flex-row justify-center items-center gap-14 lg:gap-24 mt-8 mb-20"
  data-aos="fade-up"
  data-aos-duration="1000"
>
  <div
    className="text-center lg:text-left max-w-2xl"
    data-aos="fade-right"
    data-aos-delay="200"
    data-aos-duration="1000"
  >
    <h3 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-6 leading-tight tracking-wide drop-shadow-md">
      About <span className="text-blue-950">FoodBridge Mirpur</span>
    </h3>
    <p className="text-gray-700 text-lg md:text-xl leading-relaxed tracking-wide bg-white p-4 rounded-xl shadow-lg">
      Every day, tons of perfectly edible food is thrown away. At the same time, many families sleep hungry.
      <span className="block mt-3 font-semibold text-green-700">
        FoodBridge bridges this gap by connecting surplus food to empty plates — quickly, safely, and compassionately.
      </span>
    </p>
  </div>

  <div
    className="w-full max-w-sm lg:max-w-md hidden lg:block"
    data-aos="zoom-in"
    data-aos-delay="300"
    data-aos-duration="1000"
  >
    <img
      src="https://thumbs.dreamstime.com/b/hands-poor-handed-plate-to-receive-food-volunteers-alleviate-hunger-concept-helping-homeless-169675912.jpg?w=992"
      alt="Food Donation"
      className="rounded-2xl shadow-2xl border border-green-200"
    />
  </div>
</div>


      {/* CORE VALUES & WHY IT MATTERS */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Core Values */}
        <div className="bg-white p-6 rounded-3xl shadow-xl flex-1">
          <h3 className="text-3xl md:text-4xl font-extrabold text-emerald-800 text-center mb-10 drop-shadow-sm">Core Values</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: "Compassion", desc: "Every meal matters. Every person matters.", color: "emerald" },
              { title: "Transparency", desc: "Food is tracked from donation to delivery.", color: "yellow" },
              { title: "Efficiency", desc: "We respond quickly and work smart.", color: "sky" },
              { title: "Safety", desc: "Food is handled and stored with care and quality checks.", color: "red" },
              { title: "Dignity", desc: "We serve the needy without labeling them.", color: "indigo", full: true }
            ].map(({ title, desc, color, full }) => (
              <div key={title} className={`bg-${color}-50 border-l-4 border-${color}-400 p-5 rounded shadow-md ${full ? "sm:col-span-2" : ""}`}>
                <h4 className={`text-xl font-bold text-${color}-700 mb-2`}>{title}</h4>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Matters */}
        <div className="bg-gradient-to-br from-yellow-50 via-white to-green-50 p-6 rounded-3xl shadow-xl flex-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6 text-center tracking-tight">
            🌍 Why It Matters
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center">
            In Pakistan, over <span className="text-orange-700 font-semibold">40% of food</span> is wasted annually, while more than <span className="text-red-600 font-semibold">25 million people</span> face hunger.
            <br /><br />
            <span className="text-emerald-700 font-bold">
              FoodBridge Mirpur aims to change that — one meal, one donation, and one act of kindness at a time.
            </span>
          </p>
        </div>
      </div>

      {/* VOLUNTEERS */}
      <div className="bg-orange-50 py-16   px-6 md:px-20 rounded-3xl shadow-lg mb-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-800 mb-6 tracking-tight">
              🟧 Volunteers & Community
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Our work wouldn’t be possible without the dedication of local heroes —
              <span className="font-medium text-orange-700"> students, citizens, restaurant owners, and workers </span>
              who go the extra mile to ensure no food is wasted.
              <br /><br />
              <span className="text-emerald-700 font-semibold">
                If you're passionate about helping others, join us as a volunteer and be part of the solution.
              </span>
            </p>
          </div>
          <div className="flex-1 hidden lg:block">
            <img
              src="https://www.californiavolunteers.ca.gov/wp-content/uploads/sites/116/2020/04/support-food-banks-icon.png"
              alt="Volunteers"
              className="rounded-2xl shadow-xl border border-orange-200"
            />
          </div>
        </div>
      </div>


      

    </div>
  );
};

export default About;
