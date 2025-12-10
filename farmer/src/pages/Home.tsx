import React from 'react';
import { Plus, Wallet, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useWallet } from '../context/WalletContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { balance } = useWallet();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-2">{t('welcomeFarmer')}</h1>
        <p className="text-green-700">{t('manageCropsCoins')}</p>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Wallet Balance</p>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">{balance}</span>
              <span className="text-lg">AgriCoins</span>
            </div>
            <p className="text-green-100 text-sm">≈ ₹{balance * 20}</p>
          </div>
          <Wallet size={32} className="text-green-200" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-green-900 mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-green-800">Crops Added</div>
          </div>
          <div>
            <div className="text-sm font-bold text-green-600">-</div>
            <div className="text-sm text-green-800">Last Delivery</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Aggregator Contact</p>
              <p className="text-sm text-gray-600">Rajesh (+91-9876543210)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-green-900">Quick Actions</h2>
        
        <button
          onClick={() => navigate('/delivery/add')}
          className="w-full bg-green-600 text-white rounded-lg p-4 flex items-center justify-center space-x-3 hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">Add New Crop</span>
        </button>

        <button
          onClick={() => navigate('/wallet')}
          className="w-full bg-yellow-500 text-white rounded-lg p-4 flex items-center justify-center space-x-3 hover:bg-yellow-600 transition-colors"
        >
          <Wallet size={20} />
          <span className="font-medium">View Wallet</span>
        </button>
      </div>

    </div>
  );
};

export default Home;