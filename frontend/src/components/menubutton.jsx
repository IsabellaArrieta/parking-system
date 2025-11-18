import React from 'react';
import logoPng from "../assets/logo2.png";
const HamburgerButton = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-2 right-16 z-50 w-12 h-12 flex flex-col justify-center items-center bg-transparent border-0 cursor-pointer transition-all duration-300"
      aria-label="Menu"
    >

            {/* HAMBURGER ANIMATION */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center gap-0.5 transition-opacity duration-300 ${
          isOpen ? "opacity-0 scale-75" : "opacity-100 scale-100"
        }`}
      >
        <span
          className="
            block w-8 h-[7px] rounded-full 
            transition-all duration-300 ease-in-out
          "
          style={{ backgroundColor: "#FF4F79" }}
        />
        <span
          className="
            block w-8 h-[7px] rounded-full 
            transition-all duration-300 ease-in-out
          "
          style={{ backgroundColor: "#FF4F79" }}
        />
        <span
          className="
            block w-8 h-[7px] rounded-full 
            transition-all duration-300 ease-in-out
          "
          style={{ backgroundColor: "#FF4F79" }}
        />
      </div>

      <img
        src={logoPng}
        alt="Menu logo"
        className={`
          transition-all duration-300
          ${isOpen ? "opacity-100 scale-110" : "opacity-0 scale-75"}
          w-16 h-16 fixed top-8 right-8           
          object-contain
        `}
      />
    </button>
  );
};

export default HamburgerButton;