import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the current page title based on the path
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/home':
        return 'Dashboard';
      case '/scan':
        return 'Scan Batch';
      case '/farmers':
        return 'Farmers';
      case '/wallet':
        return 'Wallet';
      case '/profile':
        return 'Profile';
      default:
        return 'AgriCoin';
    }
  };

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        {location.pathname !== '/home' && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-green-800" />
          </button>
        )}
        <h1 className="font-bold text-lg text-green-900">{getPageTitle()}</h1>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-100 relative">
        <Bell size={20} className="text-green-800" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </nav>
  );
};

export default TopNav;