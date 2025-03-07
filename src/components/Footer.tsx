import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="https://i.imgur.com/r1zEbbG.png"
              alt="Smoke & Go"
              className="h-12 mb-4"
            />
            <p className="text-gray-300">Your premier destination for premium smoking accessories and products.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-500" />
                <span>360-377-2117</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-500" />
                <span>smokengoapp@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">2024 Smoke & Go. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Must be 21 or older to purchase.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
