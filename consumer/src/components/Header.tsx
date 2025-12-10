import React from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showLanguageToggle?: boolean;
}

export default function Header({ title, showBack = false, showLanguageToggle = false }: HeaderProps) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
      
      {showLanguageToggle && (
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Globe className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-600 uppercase">
            {language}
          </span>
        </button>
      )}
    </header>
  );
}