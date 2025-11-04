import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">SmartAg Advisor</h3>
            <p className="text-gray-300">
              Empowering farmers with intelligent agricultural solutions.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Farmer Dashboard</Link></li>
              <li><Link to="/experts" className="text-gray-300 hover:text-white">Expert Network</Link></li>
              <li><Link to="/disease-detection" className="text-gray-300 hover:text-white">Disease Detection</Link></li>
              <li><Link to="/knowledge" className="text-gray-300 hover:text-white">Knowledge Repository</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-gray-300 hover:text-white">Forums</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white">Events</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Smart Agriculture Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;