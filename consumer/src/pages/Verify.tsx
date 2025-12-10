import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Edit3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';

export default function Scan() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scan - in real app, would use camera API
    setTimeout(() => {
      setIsScanning(false);
      // Simulate successful scan
      navigate('/result/AGR001');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title={t('scan.title')} showBack />
      
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-6">{t('scan.instruction')}</p>
          
          {/* Camera Preview Area */}
          <div className="relative w-full max-w-sm mx-auto aspect-square bg-gray-900 rounded-lg overflow-hidden mb-6">
            {isScanning ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-yellow-400 rounded-lg animate-pulse">
                  <div className="absolute inset-4 border border-yellow-400/50 rounded-lg">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-yellow-400 text-sm">Scanning...</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <Camera className="w-16 h-16 mb-4" />
                <p className="text-sm">Tap to start scanning</p>
              </div>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg mb-4 transition-colors"
          >
            {isScanning ? 'Scanning...' : 'Start Camera'}
          </button>

          <button
            onClick={() => navigate('/verify')}
            className="w-full bg-white hover:bg-gray-50 text-green-600 font-semibold py-3 px-6 rounded-lg border-2 border-green-600 flex items-center justify-center space-x-2 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>{t('scan.fallback')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}