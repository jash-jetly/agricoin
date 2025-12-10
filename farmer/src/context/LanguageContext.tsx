import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'hi' | 'mr';

// Define language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Define translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'AgriCoin',
    home: 'Home',
    delivery: 'Delivery',
    market: 'Market',
    profile: 'Profile',
    addNewCrop: 'Add New Crop',
    viewWallet: 'View Wallet',
    myWallet: 'My Wallet',
    settings: 'Settings',
    notifications: 'Notifications',
    language: 'Language',
    english: 'English',
    hindi: 'Hindi',
    marathi: 'Marathi',
    welcomeFarmer: 'Welcome, Farmer',
    manageCropsCoins: 'Manage your crops and AgriCoins',
  },
  hi: {
    appTitle: 'किसान ऐप',
    home: 'होम',
    delivery: 'डिलीवरी',
    market: 'बाज़ार',
    profile: 'प्रोफाइल',
    addNewCrop: 'नई फसल जोड़ें',
    viewWallet: 'वॉलेट देखें',
    myWallet: 'मेरा वॉलेट',
    settings: 'सेटिंग्स',
    notifications: 'सूचनाएं',
    language: 'भाषा',
    english: 'अंग्रेज़ी',
    hindi: 'हिंदी',
    marathi: 'मराठी',
    welcomeFarmer: 'स्वागत है, किसान',
    manageCropsCoins: 'अपनी फसलों और एग्रीकॉइन्स का प्रबंधन करें',
  },
  mr: {
    appTitle: 'शेतकरी अॅप',
    home: 'होम',
    delivery: 'वितरण',
    market: 'बाजार',
    profile: 'प्रोफाइल',
    addNewCrop: 'नवीन पीक जोडा',
    viewWallet: 'वॉलेट पहा',
    myWallet: 'माझे वॉलेट',
    settings: 'सेटिंग्ज',
    notifications: 'सूचना',
    language: 'भाषा',
    english: 'इंग्रजी',
    hindi: 'हिंदी',
    marathi: 'मराठी',
    welcomeFarmer: 'स्वागत आहे, शेतकरी',
    manageCropsCoins: 'तुमची पिके आणि एग्रीकॉइन्स व्यवस्थापित करा',
  },
};

// Create the provider component
type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && ['en', 'hi', 'mr'].includes(savedLanguage) ? savedLanguage : 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Update language and save to localStorage
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);