import React, { useState } from 'react';
import { Gift } from 'lucide-react';

const Rewards = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const rewards = [
    { reward: 'Free hand pipe under $8', points: 100 },
    { reward: '10% off entire purchase (no tobacco)', points: 100 },
    { reward: '20% off glass', points: 250 },
    { reward: 'Free Kratom shot', points: 350 },
    { reward: 'Free Kratom under $27', points: 700 },
    { reward: 'Free vape under $25', points: 700 },
    { reward: '$50 store credit', points: 1000 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (will be implemented with Supabase)
    console.log(formData);
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Gift className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Rewards Program</h1>
        <p className="text-xl text-gray-600">
          Earn points with every purchase and redeem them for exclusive rewards
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Reward
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Point Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rewards.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.reward}
                </td>
                <td className="px-6 py-4 text-sm text-purple-600 font-semibold">
                  {item.points} points
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-purple-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">How to Earn Points</h2>
        <p className="text-gray-700 mb-6">
          Members earn 1 point for every $1 spent. Points can be redeemed for any of the rewards listed above. Visit any of our locations to check your point balance or redeem rewards.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Become a Member
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-6">Membership Registration</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;
