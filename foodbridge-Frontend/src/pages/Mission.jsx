import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Mission = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-emerald-100 px-6 py-12 lg:px-32">
      
      {/* Header */}
      <div className="text-center mb-16" data-aos="fade-down">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 drop-shadow-md">
           Our Mission
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          We aim to build a bridge between surplus food and hungry families — with compassion, safety, and speed.
        </p>
      </div>

    {/* Mission Cards or Sections */}
<div className="grid md:grid-cols-2 gap-12 mt-16">
  
  {/* Card 1 */}
  <div
    className="bg-gradient-to-br from-orange-100 via-white to-orange-50 border-l-[6px] border-orange-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
    data-aos="fade-right"
  >
    <h3 className="text-2xl font-extrabold text-orange-800 flex items-center gap-2 mb-4">
      🍛 <span>Reduce Food Waste</span>
    </h3>
    <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
      We collect leftover food from restaurants, events, and homes — ensuring it's safely repurposed to feed the needy.
    </p>
  </div>

  {/* Card 2 */}
  <div
    className="bg-gradient-to-br from-sky-100 via-white to-sky-50 border-l-[6px] border-sky-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
    data-aos="fade-left"
  >
    <h3 className="text-2xl font-extrabold text-sky-800 flex items-center gap-2 mb-4">
      🤝 <span>Support the Needy</span>
    </h3>
    <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
      By distributing food to low-income areas and shelters, we ensure that no plate remains empty.
    </p>
  </div>

  {/* Card 3 */}
  <div
    className="bg-gradient-to-br from-green-100 via-white to-green-50 border-l-[6px] border-green-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
    data-aos="fade-up"
  >
    <h3 className="text-2xl font-extrabold text-green-800 flex items-center gap-2 mb-4">
      🌍 <span>Build a Community</span>
    </h3>
    <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
      We bring volunteers, donors, and food heroes together for one shared purpose — ending hunger.
    </p>
  </div>

  {/* Card 4 */}
  <div
    className="bg-gradient-to-br from-indigo-100 via-white to-indigo-50 border-l-[6px] border-indigo-500 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
    data-aos="fade-up"
  >
    <h3 className="text-2xl font-extrabold text-indigo-800 flex items-center gap-2 mb-4">
      📈 <span>Raise Awareness</span>
    </h3>
    <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
      We educate communities on the importance of responsible food habits, sustainability, and kindness.
    </p>
  </div>
</div>


     {/* CTA */}
<div
  className="mt-24 text-center bg-gradient-to-br from-emerald-50 via-white to-yellow-50 px-6 py-12 rounded-3xl shadow-xl max-w-4xl mx-auto"
  data-aos="zoom-in"
>
  <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-4 tracking-tight drop-shadow-sm">
     Be a Part of the Change
  </h2>
  <p className="text-lg md:text-xl text-gray-700 leading-relaxed tracking-wide">
    Join us in our mission to create a hunger-free and waste-free <span className="font-semibold text-orange-700">Mirpur</span>.
    <br className="hidden md:block" />
    <span className="text-green-700 font-medium">
      Your small effort can spark big change.
    </span>
  </p>
</div>


    </div>
  );
};

export default Mission;
