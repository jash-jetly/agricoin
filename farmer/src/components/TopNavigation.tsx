import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';

const TopNavigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setShowLanguageMenu(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-sm mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium text-base">{t('appTitle')}</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={languageMenuRef}>
            <button 
              className="p-2 rounded-full hover:bg-green-800 transition-colors duration-200 flex items-center"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              <span className="mr-1 text-sm font-medium">{language.toUpperCase()}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${language === 'en' ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  {t('english')}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${language === 'hi' ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => handleLanguageChange('hi')}
                >
                  {t('hindi')}
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${language === 'mr' ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => handleLanguageChange('mr')}
                >
                  {t('marathi')}
                </button>
              </div>
            )}
          </div>
          
          {/* Notification Button */}
          <button className="p-2 rounded-full hover:bg-green-800 transition-colors duration-200 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          {/* Settings Button */}
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;