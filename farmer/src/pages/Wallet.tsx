import React from 'react';
import { TrendingUp, TrendingDown, Coins, IndianRupee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useWallet } from '../context/WalletContext';

const Wallet: React.FC = () => {
  const { t } = useLanguage();
  const { balance } = useWallet();
  const inrValue = balance * 20; // 1 AgriCoin = ₹20

  const { transactions } = useWallet();

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-900">{t('myWallet')}</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-green-100 text-sm">Total Balance</p>
            <div className="flex items-center space-x-2">
              <Coins size={24} />
              <span className="text-3xl font-bold">{balance}</span>
              <span className="text-lg">AgriCoins</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-green-100">
          <IndianRupee size={16} />
          <span className="text-lg">≈ ₹{inrValue.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-green-600 text-white rounded-lg p-4 flex flex-col items-center space-y-2 hover:bg-green-700 transition-colors">
          <TrendingDown size={20} />
          <span className="font-medium">Sell Now</span>
        </button>
        <button className="bg-blue-500 text-white rounded-lg p-4 flex flex-col items-center space-y-2 hover:bg-blue-600 transition-colors">
          <TrendingUp size={20} />
          <span className="font-medium">Transfer</span>
        </button>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-green-900 mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'minted' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'minted' ? 
                      <TrendingUp size={16} /> : 
                      <TrendingDown size={16} />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-green-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} coins
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹{Math.abs(transaction.inr).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">AgriCoin Benefits:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Coins minted only after aggregator confirms delivery</li>
          <li>• Higher value than traditional pricing</li>
          <li>• Instant payments with no delays</li>
          <li>• Transparent blockchain-based transactions</li>
        </ul>
      </div>
    </div>
  );
};

export default Wallet;