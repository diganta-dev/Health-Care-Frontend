import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} Health Care Management System. All
          rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
