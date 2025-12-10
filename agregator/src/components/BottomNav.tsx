import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Camera, Users, Wallet, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/scan', icon: Camera, label: 'Scan' },
    { path: '/farmers', icon: Users, label: 'Farmers' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 shadow-lg">
      <div className="flex justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;