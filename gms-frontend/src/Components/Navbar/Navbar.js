import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path, e) => {
    e.stopPropagation();
    navigate(path);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 py-6 px-4 shadow-md fixed w-full z-50 top-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div
          className="text-white font-bold text-xl cursor-pointer hover:text-yellow-400 transition hidden sm:block"
          onClick={(e) => handleNavigation("/user-home", e)}
        >
          GymHunger
        </div>

        {/* Mobile Logo (smaller) */}
        <div
          className="text-white font-bold text-lg cursor-pointer hover:text-yellow-400 transition sm:hidden"
          onClick={(e) => handleNavigation("/user-home", e)}
        >
          GH
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 text-white font-semibold">
            <li
              className="hover:text-yellow-400 cursor-pointer transition"
              onClick={(e) => handleNavigation("/user-home", e)}
            >
              Home
            </li>
            <li
              className="hover:text-yellow-400 cursor-pointer transition"
              onClick={(e) => handleNavigation("/workouts", e)}
            >
              Workouts
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            <div
              className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer overflow-hidden border-2 border-white hover:border-yellow-400 transition"
              title="User Profile"
              onClick={() => navigate("/user-profile")}
            >
              <img
                src={localStorage.getItem("gymPic") || "/default-profile.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/default-profile.jpg";
                }}
              />
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Mobile Profile Icon */}
          <div
            className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer overflow-hidden border-2 border-white hover:border-yellow-400 transition"
            title="User Profile"
            onClick={() => navigate("/user-profile")}
          >
            <img
              src={localStorage.getItem("gymPic") || "/default-profile.jpg"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/default-profile.jpg";
              }}
            />
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-gradient-to-r from-blue-700 to-indigo-700 border-t border-blue-600 transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-4 space-y-3">
          <div
            className="text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-600 cursor-pointer transition block"
            onClick={(e) => handleNavigation("/user-home", e)}
          >
            Home
          </div>
          <div
            className="text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-600 cursor-pointer transition block"
            onClick={(e) => handleNavigation("/workouts", e)}
          >
            Workouts
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
