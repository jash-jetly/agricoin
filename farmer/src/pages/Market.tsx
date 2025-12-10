import React from 'react';
import { TrendingUp, TrendingDown, Info, IndianRupee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Market: React.FC = () => {
  const { t } = useLanguage();
  const mandiPrices = [
    { crop: 'Onion', price: 20, trend: 'up' },
    { crop: 'Tomato', price: 25, trend: 'down' },
    { crop: 'Wheat', price: 22, trend: 'up' },
    { crop: 'Rice', price: 28, trend: 'stable' },
    { crop: 'Potato', price: 18, trend: 'up' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-900">{t('market')}</h1>

      {/* AgriCoin Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-green-900">Manage Your AgriCoins</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => alert('Sell functionality coming soon!')}
            className="bg-red-500 text-white rounded-lg p-4 flex flex-col items-center space-y-2 hover:bg-red-600 transition-colors"
          >
            <TrendingDown size={20} />
            <span className="font-medium">Sell Coins</span>
            <span className="text-xs opacity-90">Instant Payout</span>
          </button>
          
          <button
            onClick={() => alert('Hold strategy activated!')}
            className="bg-yellow-500 text-white rounded-lg p-4 flex flex-col items-center space-y-2 hover:bg-yellow-600 transition-colors"
          >
            <TrendingUp size={20} />
            <span className="font-medium">Hold Coins</span>
            <span className="text-xs opacity-90">Future Growth</span>
          </button>
        </div>
      </div>

      {/* Market Recommendation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">Market Recommendation</h3>
            <p className="text-sm text-blue-700">
              Holding may give you better value this week. Onion and wheat prices are trending upward.
            </p>
          </div>
        </div>
      </div>

      {/* Today's Mandi Prices */}
      <div>
        <h2 className="text-lg font-semibold text-green-900 mb-4">Today's Mandi Prices</h2>
        <div className="space-y-3">
          {mandiPrices.map((item) => (
            <div key={item.crop} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {item.crop.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">{item.crop}</h3>
                    <p className="text-sm text-gray-600">Per kg</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <IndianRupee size={16} className="text-green-600" />
                    <span className="text-lg font-bold text-green-900">{item.price}</span>
                    {getTrendIcon(item.trend)}
                  </div>
                  <p className={`text-xs ${getTrendColor(item.trend)}`}>
                    {item.trend === 'up' ? 'Rising' : item.trend === 'down' ? 'Falling' : 'Stable'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-3">Market Insights</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div>• Onion demand is high due to festival season</div>
          <div>• Wheat prices expected to rise next week</div>
          <div>• Potato supply is abundant, prices may drop</div>
          <div>• Rice market is stable with steady demand</div>
        </div>
      </div>
    </div>
  );
};

export default Market;