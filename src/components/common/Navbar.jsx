import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16">
      <div className="flex-shrink-0">
        <Link to="/" className="text-xl font-bold text-green-600">
          SmartAg Advisor
        </Link>
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          <Link to="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
            Dashboard
          </Link>
          <Link to="/experts" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
            Experts
          </Link>
          <Link to="/disease-detection" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
            Disease Detection
          </Link>
          <Link to="/knowledge" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
            Knowledge Base
          </Link>
          <Link to="/community" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
            Community
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;