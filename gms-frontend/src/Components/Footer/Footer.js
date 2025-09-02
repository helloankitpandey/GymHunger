import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">GymHunger</h3>
            <p className="text-gray-300">Your ultimate fitness companion for achieving your health and wellness goals.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Workouts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Nutrition</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-gray-300">📧 gymhunger046@gmail.com</p>
            <p className="text-gray-300">📞 +91 8596471231</p>
            <p className="text-gray-300">📍 123 Fitness Street, Gym City</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">© 2024 GymHunger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
