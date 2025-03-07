import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.imgur.com/VNMBEeA.png")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <img 
              src="https://i.imgur.com/r1zEbbG.png"
              alt="Smoke & Go"
              className="mx-auto mb-6 h-32 object-contain"
            />
            <p className="text-xl mb-8">Your Premier Destination for Premium Smoking Accessories</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
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
