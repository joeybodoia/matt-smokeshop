import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.imgur.com/r1zEbbG.png" 
                alt="Smoke Glass & Vape" 
                className="h-12"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/products" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Featured Brands</Link>
              <Link to="/locations" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Locations</Link>
              <Link to="/rewards" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Rewards</Link>
              <Link 
                to="/employment" 
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Join Our Team
              </Link>
              <a 
                href="https://www.instagram.com/smokego_wa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Featured Brands
            </Link>
            <Link
              to="/locations"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Locations
            </Link>
            <Link
              to="/rewards"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Rewards
            </Link>
            <Link
              to="/employment"
              className="block bg-purple-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Join Our Team
            </Link>
            <a
              href="https://www.instagram.com/smokego_wa"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
