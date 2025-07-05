import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
      <p className="text-sm">&copy; {new Date().getFullYear()} FoodBridge. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
