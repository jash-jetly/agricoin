import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Hash, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header title={t('app.title')} showLanguageToggle />
      
      <div className="px-6 py-12 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-900 mb-2">{t('app.title')}</h1>
          <p className="text-gray-600 text-base leading-relaxed px-2">
            {t('app.tagline')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-sm mx-auto">
          <button
            onClick={() => navigate('/verify')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-colors shadow-lg"
          >
            <Hash className="w-5 h-5" />
            <span>{t('home.enterBatch')}</span>
          </button>
          
          <button
            onClick={() => navigate('/scan')}
            className="w-full bg-white hover:bg-gray-50 text-green-600 font-semibold py-4 px-6 rounded-lg border-2 border-green-600 flex items-center justify-center space-x-3 transition-colors"
          >
            <QrCode className="w-5 h-5" />
            <span>{t('home.scanQR')}</span>
          </button>
        </div>

        {/* Demo Batch IDs */}
        <div className="mt-12 text-left max-w-sm mx-auto">
          <p className="text-sm text-gray-500 mb-3">Demo Batch IDs to try:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {['16040', '16041', '16042', '16043', '16044', '16045'].map((id) => (
              <button
                key={id}
                onClick={() => navigate(`/result/${id}`)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
