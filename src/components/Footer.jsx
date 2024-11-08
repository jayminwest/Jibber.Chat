import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Jibber.chat</h3>
            <p className="text-gray-300 mb-4">
              Your AI-powered ski buddy for real-time mountain intel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                📘
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                🐦
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/#features" className="block text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link to="/#pricing" className="block text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/#contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/faq" className="block text-gray-300 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link to="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-gray-300">Email: info@jibber.chat</p>
              <p className="text-gray-300">Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Jibber.chat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
