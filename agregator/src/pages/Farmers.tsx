import React, { useState } from 'react';
import { Search, MapPin, Leaf } from 'lucide-react';

const Farmers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const farmers = [
    {
      id: 1,
      name: 'Aditya Chouskey',
      location: 'Nashik',
      crops: ['Onion', 'Tomato'],
      phone: '+91-9876543210',
      totalBatches: 15,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Mini Nayak',
      location: 'Pune',
      crops: ['Wheat', 'Rice'],
      phone: '+91-9876543211',
      totalBatches: 23,
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Jash Jetly',
      location: 'Solapur',
      crops: ['Cotton', 'Sugarcane'],
      phone: '+91-9876543212',
      totalBatches: 8,
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Mahek Yadav',
      location: 'Aurangabad',
      crops: ['Onion', 'Cotton', 'Wheat'],
      phone: '+91-9876543213',
      totalBatches: 31,
      rating: 4.7,
    },
  ];

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <p className="text-green-700">Manage your farmer network</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search farmers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-green-900"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-2xl font-bold text-green-600">{farmers.length}</p>
          <p className="text-sm text-green-700">Total Farmers</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl">
          <p className="text-2xl font-bold text-yellow-600">
            {farmers.reduce((sum, farmer) => sum + farmer.totalBatches, 0)}
          </p>
          <p className="text-sm text-yellow-700">Total Batches</p>
        </div>
      </div>

      {/* Farmers List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-green-900">
          {searchTerm ? `Search Results (${filteredFarmers.length})` : 'All Farmers'}
        </h2>
        
        {filteredFarmers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No farmers found</p>
          </div>
        ) : (
          filteredFarmers.map((farmer) => (
            <div key={farmer.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-green-900 text-lg">{farmer.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {farmer.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
                    <span className="text-yellow-600 font-semibold text-sm">★ {farmer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <Leaf size={14} className="mr-1 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Crops:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {farmer.crops.map((crop, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{farmer.totalBatches}</span> batches collected
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Contact
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Farmers;
