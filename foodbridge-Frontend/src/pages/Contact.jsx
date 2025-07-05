import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-white via-emerald-50 to-yellow-50  ">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-5 md:p-12" data-aos="fade-up">
        <h2 className="text-4xl font-extrabold text-center text-emerald-800 mb-10 tracking-tight drop-shadow-md">
          📬 Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 md:ml-0   lg:ml-40 ">
          {/* Contact Info */}
          <div className="space-y-6 text-base md:text-lg  md:pl-20   lg:pl-40 md:w-2xl lg:w-2xl text-gray-700 leading-relaxed bg-gradient-to-br from-emerald-50 via-white to-yellow-50 p-6 rounded-2xl shadow-md">
            {/* Address */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="text-emerald-900 font-bold">Address</h4>
                <p className="text-gray-800">Street 123, FoodBridge HQ, Mirpur AJK</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="text-emerald-900 font-bold">Phone</h4>
                <p className="text-gray-800">+92 312 1234567</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <h4 className="text-emerald-900 font-bold">Email</h4>
                <p className="text-gray-800">foodbridge.mirpur@gmail.com</p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <h4 className="text-emerald-900 font-bold">Office Hours</h4>
                <p className="text-gray-800">Mon – Sat, 9:00 AM to 6:00 PM</p>
              </div>
           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
