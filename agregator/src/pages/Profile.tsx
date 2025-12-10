import React from 'react';
import { Settings, LogOut, MapPin, Phone, Mail, Award, Users, Package } from 'lucide-react';

const Profile = () => {
  const userDetails = {
    name: 'Rajesh Aggregator',
    district: 'Nashik',
    contact: '+91-9876543210',
    email: 'rajesh@agricoin.com',
    joinedDate: 'Jan 2024',
    totalFarmers: 23,
    totalBatches: 156,
    rating: 4.8,
  };

  const handleSettings = () => {
    alert('Settings page would open here');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully');
    }
  };

  const achievements = [
    { icon: Users, label: 'Top Aggregator', description: 'Managed 20+ farmers' },
    { icon: Package, label: 'Batch Expert', description: '100+ batches processed' },
    { icon: Award, label: 'Quality Leader', description: '4.8+ rating maintained' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <p className="text-green-700">Manage your account</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl text-white shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-green-600">
              {userDetails.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{userDetails.name}</h2>
            <p className="text-green-100">Aggregator • Member since {userDetails.joinedDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-500">
          <div className="text-center">
            <p className="text-2xl font-bold">{userDetails.totalFarmers}</p>
            <p className="text-green-100 text-sm">Farmers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userDetails.totalBatches}</p>
            <p className="text-green-100 text-sm">Batches</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">★ {userDetails.rating}</p>
            <p className="text-green-100 text-sm">Rating</p>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Aggregator Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">District</p>
              <p className="font-medium text-green-900">{userDetails.district}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Contact</p>
              <p className="font-medium text-green-900">{userDetails.contact}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-green-900">{userDetails.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-green-900">Achievements</h3>
        
        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-800">{achievement.label}</p>
                    <p className="text-sm text-yellow-700">{achievement.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleSettings}
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <Settings size={20} className="text-gray-600" />
            <span className="font-medium text-green-900">Settings</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors duration-200 text-red-600"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* App Info */}
      <div className="pt-4 text-center">
        <p className="text-gray-500 text-sm">AgriCoin Aggregator v1.0</p>
        <p className="text-gray-400 text-xs">© 2024 AgriTech Solutions</p>
      </div>
    </div>
  );
};

export default Profile;