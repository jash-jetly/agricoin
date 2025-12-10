import React from 'react';
import { Edit3, LogOut, MapPin, Phone, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const handleEditProfile = () => {
    alert('Edit profile functionality coming soon!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      // In a real app, this would clear authentication and redirect to login
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-900">{t('profile')}</h1>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src="https://i.ibb.co/TD58pb64/Whats-App-Image-2025-09-11-at-23-33-16.jpg" alt="Aditya Chouskey" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-900">Aditya Chouskey</h2>
            <p className="text-gray-600">Verified Farmer</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <MapPin size={18} className="text-green-600" />
            <span>Nashik, Maharashtra</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Phone size={18} className="text-green-600" />
            <span>+91-9876543210</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-green-800">Crops Delivered</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">180</div>
          <div className="text-sm text-yellow-800">AgriCoins</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleEditProfile}
          className="w-full bg-green-600 text-white rounded-lg p-4 flex items-center justify-center space-x-3 hover:bg-green-700 transition-colors"
        >
          <Edit3 size={20} />
          <span className="font-medium">Edit Profile</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white rounded-lg p-4 flex items-center justify-center space-x-3 hover:bg-red-700 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Farm Details */}
      <div className="bg-white rounded-lg p-5 space-y-4 shadow-md border border-green-100">
        <h3 className="text-lg font-semibold mb-3 text-green-800 border-b border-green-100 pb-2">Farm Information</h3>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-gray-700">Farm Size:</span>
          </div>
          <span className="font-medium text-gray-900 bg-green-50 px-3 py-1 rounded-full text-sm">5 acres</span>
        </div>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">Farming Since:</span>
          </div>
          <span className="font-medium text-gray-900 bg-green-50 px-3 py-1 rounded-full text-sm">2018</span>
        </div>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="text-gray-700">Primary Crops:</span>
          </div>
          <span className="font-medium text-gray-900 bg-green-50 px-3 py-1 rounded-full text-sm">Onion, Potato</span>
        </div>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-gray-700">Soil pH Scale:</span>
          </div>
          <span className="font-medium text-gray-900 bg-green-50 px-3 py-1 rounded-full text-sm">6.5 - 7.2</span>
        </div>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-gray-700">Pesticides Used:</span>
          </div>
          <span className="font-medium text-gray-900 bg-green-50 px-3 py-1 rounded-full text-sm">Organic Neem Extract</span>
        </div>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-gray-700">Irrigation Method:</span>
          </div>
          <span className="font-medium text-gray-900 bg-green-50 px-3 py-1 rounded-full text-sm">Drip Irrigation</span>
        </div>
        
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">AgriCoin Member:</span>
          </div>
          <span className="font-medium text-gray-900 bg-green-50 px-3 py-1 rounded-full text-sm">Since Jan 2024</span>
        </div>
      </div>

      {/* Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-700 mb-3">
          Contact support for app assistance or reach out to your aggregator for crop-related queries.
        </p>
        <button className="text-blue-600 font-medium text-sm hover:text-blue-800">
          Contact Support →
        </button>
      </div>
    </div>
  );
};

export default Profile;