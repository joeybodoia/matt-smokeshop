import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Brand } from '../types';
import { ChevronDown } from 'lucide-react';

const Products = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Vapor');
  const [categories, setCategories] = useState<string[]>([]);

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
          const brandsData = data as Brand[];
          // Ensure subcategory is always an array
          const processedBrands = brandsData.map(brand => ({
            ...brand,
            category: Array.isArray(brand.category) ? brand.category : [],
            subcategory: Array.isArray(brand.subcategory) ? brand.subcategory : []
          }));
          setBrands(processedBrands);
          
          // Extract unique categories and sort them with 'Other' last
          const uniqueCategories = Array.from(
            new Set(processedBrands.flatMap(brand => brand.category))
          ).filter(Boolean); // Remove any null/undefined values
          
          // Sort categories with 'Other' at the end
          const sortedCategories = uniqueCategories.sort((a, b) => {
            if (a === 'Other') return 1;
            if (b === 'Other') return -1;
            return a.localeCompare(b);
          });
          
          setCategories(sortedCategories);
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

  const filteredBrands = brands.filter(brand => 
    Array.isArray(brand.category) && brand.category.includes(selectedCategory)
  );

  // Get unique subcategories for the selected category
  const subcategories = Array.from(
    new Set(
      filteredBrands
        .filter(brand => 
          Array.isArray(brand.category) && 
          brand.category.includes(selectedCategory) &&
          Array.isArray(brand.subcategory)
        )
        .flatMap(brand => brand.subcategory)
    )
  ).filter(Boolean); // Remove any null/undefined values

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Featured Brands</h1>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 leading-tight focus:outline-none focus:border-purple-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {selectedCategory === 'Vapor' && subcategories.length > 0 ? (
        // Display brands grouped by subcategory for Vapor category
        <div className="space-y-12">
          {subcategories.map((subcategory) => (
            <div key={subcategory} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">{subcategory}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBrands
                  .filter(brand => 
                    Array.isArray(brand.subcategory) && 
                    brand.subcategory.includes(subcategory)
                  )
                  .map((brand) => (
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
            </div>
          ))}
        </div>
      ) : (
        // Display brands without subcategory grouping for other categories
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
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
