import React from 'react';
import { NavLink } from 'react-router-dom';
import { Truck, Store, Wallet, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNavigation: React.FC = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { path: '/wallet', icon: Wallet, label: t('home') },
    { path: '/delivery', icon: Truck, label: t('delivery') },
    { path: '/market', icon: Store, label: t('market') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 shadow-xl rounded-t-xl overflow-hidden">
      <div className="grid grid-cols-4 min-w-full">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => {
              return `flex flex-col items-center justify-center py-3 px-1 transition-all duration-200 min-w-0 ${
                isActive
                  ? 'text-green-600 bg-green-50 border-t-2 border-green-600'
                  : 'text-gray-500 hover:text-green-600 hover:bg-gray-50'
              }`;
            }}
          >
            {({ isActive }) => (
              <>
                <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                <span className="text-xs mt-1 font-medium truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;