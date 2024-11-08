import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">⛷️</span>
              <span className="text-xl font-bold text-gray-900">Jibber.chat</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/chat" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Chat
            </Link>
            {location.pathname === '/' && (
              <>
                <a 
                  href="#features" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pricing
                </a>
              </>
            )}
            {user ? (
              <Link
                to="/profile"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/chat"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Chat
            </Link>
            {location.pathname === '/' && (
              <>
                <a
                  href="#features"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Pricing
                </a>
              </>
            )}
            {user ? (
              <Link
                to="/profile"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/signup"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
