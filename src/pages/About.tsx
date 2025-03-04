import React from 'react';
import { Award, Users, ThumbsUp } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Smoke Haven</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted destination for premium smoking accessories since 2020. We pride ourselves on offering quality products and exceptional service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
          <p className="text-gray-600">All our products are carefully selected and quality tested</p>
        </div>
        <div className="text-center p-6">
          <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Staff</h3>
          <p className="text-gray-600">Our knowledgeable team is here to assist you</p>
        </div>
        <div className="text-center p-6">
          <ThumbsUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
          <p className="text-gray-600">Thousands of happy customers served</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2020, Smoke Haven began with a simple mission: to provide smoking enthusiasts with the highest quality accessories and exceptional service. What started as a small local shop has grown into a trusted name in the industry.
        </p>
        <p className="text-gray-700">
          We believe in creating a welcoming environment where both newcomers and experienced enthusiasts can find exactly what they're looking for. Our commitment to quality, knowledge, and customer satisfaction has made us a leader in the industry.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Visit Our Store</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://images.unsplash.com/photo-1464890100898-a385f744067f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Store front"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Store Hours</h3>
            <div className="space-y-2 text-gray-600">
              <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
              <p>Saturday: 11:00 AM - 7:00 PM</p>
              <p>Sunday: 12:00 PM - 6:00 PM</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <p className="text-gray-600">123 Smoke Street</p>
              <p className="text-gray-600">City, State 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;