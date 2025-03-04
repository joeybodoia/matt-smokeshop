import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Smoke Haven</h3>
            <p className="text-gray-300">Your premier destination for premium smoking accessories and products.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                <span>123 Smoke Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-500" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-500" />
                <span>info@smokehaven.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-purple-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-purple-500">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">© 2024 Smoke Haven. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Must be 21 or older to purchase. Please smoke responsibly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;