import React, { useEffect, useState } from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Brand } from '../types';

const Home = () => {
  const [featuredBrands, setFeaturedBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBrands = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .limit(4);

        if (error) {
          throw error;
        }

        if (data) {
          setFeaturedBrands(data as Brand[]);
        }
      } catch (err) {
        console.error('Error fetching featured brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBrands();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[700px] bg-black overflow-hidden">
        {/* Background image with blur */}
        <div 
          className="absolute inset-0 filter blur-sm"
          style={{
            backgroundImage: 'url("https://i.imgur.com/2HvXKr7.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.1)', // Prevent blur edges from showing
            opacity: '0.8',
          }}
        />
        
        {/* Gradient overlay for better text visibility and color scheme */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(91,33,182,0.6) 0%, rgba(124,58,237,0.4) 50%, rgba(96,165,250,0.6) 100%)',
          }}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-between py-12 z-10">
          {/* Logo and Tagline */}
          <div className="text-center">
            <img 
              src="https://i.imgur.com/r1zEbbG.png"
              alt="Smoke & Go"
              className="w-[400px] h-auto object-contain mx-auto mb-6"
            />
            <p className="text-2xl text-white text-shadow-lg">
              Your Premier Destination for Premium Smoking Accessories
            </p>
          </div>

          {/* Social Media Section */}
          <div className="text-center">
            <p className="text-blue-300 text-xl mb-4 text-shadow-lg">
              Click logos to follow us for our newest updates
            </p>

            <div className="flex justify-center space-x-32 mb-16">
              <a
                href="https://www.instagram.com/smokego_wa"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <Instagram className="h-40 w-40 text-white hover:text-purple-400" />
              </a>

              <a
                href="https://www.snapchat.com/add/smokego_wa"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="h-40 w-40 text-white hover:text-yellow-400"
                  fill="currentColor"
                >
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.36-.135-.553-.045-.195-.105-.465-.164-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Link
              to="/products"
              className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              Explore Products
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Member Rewards Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Member Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-purple-600">Free vape under $25</h3>
              <div className="text-lg font-medium text-gray-700 mb-4">700 points</div>
              <p className="text-gray-600">Redeem points for a free vape</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-purple-600">20% off glass</h3>
              <div className="text-lg font-medium text-gray-700 mb-4">250 points</div>
              <p className="text-gray-600">Save on your favorite glass products</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-purple-600">10% off entire purchase</h3>
              <div className="text-lg font-medium text-gray-700 mb-4">100 points</div>
              <p className="text-gray-600">Excludes tobacco products</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/rewards"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              See all Member Rewards
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Brands Preview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Brands</h2>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {featuredBrands.length > 0 ? (
                featuredBrands.map((brand) => (
                  <div key={brand.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src={brand.images?.logo || 'https://via.placeholder.com/300x200?text=No+Image'} 
                        alt={brand.name} 
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{brand.name}</h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{brand.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback placeholders if no brands are available
                [1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Brand Name</h3>
                      <p className="text-gray-600">Brand Description</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center text-purple-600 hover:text-purple-700"
            >
              View All Brands
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
