import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Brand } from '../types';

const Products = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('brands')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setBrands(data as Brand[]);
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('Failed to load brands. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Featured Brands</h1>
      
      {brands.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No brands available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden p-4">
                <img 
                  src={brand.images?.logo || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={brand.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{brand.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
