import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, ArrowUpRight, ArrowDownRight, ChevronUp, ChevronDown } from 'lucide-react';

const Wallet = () => {
  const [timeRange, setTimeRange] = useState('1W'); // '1D', '1W', '1M', '1Y'
  
  // Vegetable-specific coins data
  const vegetableCoins = [
    { name: 'Onion', coins: 45, pricePerKg: 25, change: 3.2 },
    { name: 'Tomato', coins: 30, pricePerKg: 18, change: -1.5 },
    { name: 'Wheat', coins: 35, pricePerKg: 22, change: 2.8 },
    { name: 'Rice', coins: 25, pricePerKg: 30, change: 4.5 },
    { name: 'Cotton', coins: 15, pricePerKg: 15, change: -0.8 },
    { name: 'Sugarcane', coins: 20, pricePerKg: 12, change: 1.2 },
    { name: 'Potato', coins: 10, pricePerKg: 10, change: 0.5 },
  ];
  
  // Calculate total balance
  const totalCoins = vegetableCoins.reduce((sum, coin) => sum + coin.coins, 0);
  const totalValue = vegetableCoins.reduce((sum, coin) => sum + (coin.coins * coin.pricePerKg), 0);
  const avgRate = totalCoins > 0 ? Math.round((totalValue / totalCoins) * 10) / 10 : 0;
  const avgChange = vegetableCoins.reduce((sum, coin) => sum + coin.change, 0) / vegetableCoins.length;
  
  const balance = {
    coins: totalCoins,
    rupees: totalValue,
    rate: avgRate,
    change: Math.round(avgChange * 10) / 10,
  };

  const transactions = [
    {
      id: 1,
      date: '12 Sep',
      description: 'Sold to BigBasket',
      type: 'credit',
      amount: '₹500',
      coins: '-25 OnionCoins',
    },
    {
      id: 2,
      date: '10 Sep',
      description: 'Onion batch minted',
      type: 'debit',
      amount: '+20 OnionCoins',
      coins: '',
    },
    {
      id: 3,
      date: '8 Sep',
      description: 'Wheat batch sold',
      type: 'credit',
      amount: '₹800',
      coins: '-40 WheatCoins',
    },
    {
      id: 4,
      date: '7 Sep',
      description: 'Rice batch minted',
      type: 'debit',
      amount: '+30 RiceCoins',
      coins: '',
    },
    {
      id: 5,
      date: '5 Sep',
      description: 'Tomato batch sold',
      type: 'credit',
      amount: '₹350',
      coins: '-15 TomatoCoins',
    },
  ];

  const handleSellNow = () => {
    alert(`Selling ${balance.coins} coins for ₹${balance.rupees}. Redirecting to buyer marketplace...`);
  };

  const handleHold = () => {
    alert('Coins will be held in your wallet. You can sell them later when prices are favorable.');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <p className="text-green-700">Your AgriCoin balance</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-green-100 text-sm">Total Balance</p>
            <p className="text-3xl font-bold">{balance.coins} coins</p>
          </div>
          <div className="bg-green-500 p-2 rounded-lg">
            <TrendingUp size={24} />
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-green-500">
          <div>
            <p className="text-green-100 text-sm">Current Value</p>
            <p className="text-xl font-semibold">≈ ₹{balance.rupees.toLocaleString()}</p>
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium flex items-center ${balance.change >= 0 ? 'text-green-100' : 'text-red-200'}`}>
                {balance.change >= 0 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {Math.abs(balance.change)}% today
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-100 text-sm">Rate</p>
            <p className="text-sm font-medium">1 coin = ₹{balance.rate}</p>
          </div>
        </div>
      </div>

      {/* Vegetable Coins Breakdown */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 space-y-4">
        <h2 className="text-lg font-semibold text-green-900">Your Vegetable Coins</h2>
        <p className="text-sm text-gray-500">Each coin represents 1kg of the respective vegetable. Total: {totalCoins} coins worth ₹{totalValue}</p>
        
        <div className="space-y-3">
          {vegetableCoins.map((coin) => (
            <div key={coin.name} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
                  {coin.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-green-900">{coin.name}Coin</p>
                  <p className="text-sm text-gray-500">{coin.coins} coins ({coin.coins} kg)</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-green-900">₹{coin.pricePerKg}/kg</p>
                <p className="text-sm text-gray-600">₹{coin.coins * coin.pricePerKg} total</p>
                <p className={`text-xs flex items-center justify-end ${coin.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {coin.change >= 0 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {Math.abs(coin.change)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSellNow}
          className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowUpRight size={20} />
          <span>Sell Now</span>
        </button>
        
        <button
          onClick={handleHold}
          className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 py-4 px-6 rounded-xl font-semibold shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowDownRight size={20} />
          <span>Hold</span>
        </button>
      </div>

      {/* Market Chart */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-green-900">Market Price</h2>
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '1Y'].map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2 py-1 text-xs rounded-md ${timeRange === range 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        {/* Candlestick Chart */}
        <div className="h-48 w-full bg-gray-50 rounded-lg mb-4 overflow-hidden relative">
          <div className="absolute top-2 left-2 text-xs text-gray-500">₹30</div>
          <div className="absolute top-1/3 left-2 text-xs text-gray-500">₹25</div>
          <div className="absolute top-2/3 left-2 text-xs text-gray-500">₹20</div>
          <div className="absolute bottom-2 left-2 text-xs text-gray-500">₹15</div>
          
          {/* Horizontal grid lines */}
          <div className="absolute w-full border-t border-gray-200 top-1/4 left-0"></div>
          <div className="absolute w-full border-t border-gray-200 top-1/2 left-0"></div>
          <div className="absolute w-full border-t border-gray-200 top-3/4 left-0"></div>
          
          {/* Candlestick chart */}
          <div className="flex items-center justify-between h-full px-6 pt-4 pb-2">
            {/* Each candlestick shows: high-low line and open-close body */}
            <div className="flex flex-col items-center">
              {/* High-low line */}
              <div className="w-0.5 bg-black h-20 relative">
                {/* Open-close body (green for up, red for down) */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Sep</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-0.5 bg-black h-24 relative">
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-red-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Oct</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-0.5 bg-black h-18 relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Nov</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-0.5 bg-black h-22 relative">
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-red-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Dec</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-0.5 bg-black h-26 relative">
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Jan</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-0.5 bg-black h-20 relative">
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-4 h-7 bg-red-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Feb</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-0.5 bg-black h-28 relative">
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Mar</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-lg font-bold text-green-600">₹{balance.rate}</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className={`text-sm font-medium flex items-center ${balance.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {balance.change >= 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {Math.abs(balance.change)}%
            </span>
            <span className="text-xs text-gray-500">{timeRange}</span>
          </div>
        </div>
      </div>
      
      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-lg font-bold text-green-600">+₹1,250</p>
            </div>
            <TrendingUp size={20} className="text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earned</p>
              <p className="text-lg font-bold text-yellow-600">₹15,400</p>
            </div>
            <Calendar size={20} className="text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-green-900">Market Statistics</h2>
          <select 
            className="text-sm border border-gray-200 rounded-md p-1"
            defaultValue="all"
          >
            <option value="all">All Coins</option>
            {vegetableCoins.map(coin => (
              <option key={coin.name} value={coin.name}>{coin.name}Coin</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">24h High</p>
            <p className="text-sm font-semibold text-green-900">₹{Math.round(balance.rate * 1.1)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">24h Low</p>
            <p className="text-sm font-semibold text-green-900">₹{Math.round(balance.rate * 0.95)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">7d Change</p>
            <p className="text-sm font-semibold text-green-600 flex items-center">
              <ChevronUp size={14} className="mr-1" />
              {Math.abs(balance.change * 2).toFixed(1)}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Market Cap</p>
            <p className="text-sm font-semibold text-green-900">₹{(balance.rupees * 1000).toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Volume (24h)</p>
            <p className="text-sm font-semibold text-green-900">₹{Math.round(balance.rupees * 0.15).toLocaleString()}K</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Circulating Supply</p>
            <p className="text-sm font-semibold text-green-900">{(balance.coins * 1000).toLocaleString()} coins</p>
          </div>
        </div>
      </div>

      {/* Price History */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-green-900">Price History</h2>
          <select 
            className="text-sm border border-gray-200 rounded-md p-1"
            defaultValue="all"
          >
            <option value="all">All Coins</option>
            {vegetableCoins.map(coin => (
              <option key={coin.name} value={coin.name}>{coin.name}Coin</option>
            ))}
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">High</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Low</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: 'Sep 12', coin: 'Onion', open: '₹24.50', high: '₹25.80', low: '₹24.20', close: '₹25.00', change: '+2.04%' },
                { date: 'Sep 12', coin: 'Tomato', open: '₹18.30', high: '₹18.50', low: '₹17.90', close: '₹18.00', change: '-1.64%' },
                { date: 'Sep 11', coin: 'Onion', open: '₹24.00', high: '₹24.60', low: '₹23.80', close: '₹24.50', change: '+2.08%' },
                { date: 'Sep 11', coin: 'Wheat', open: '₹21.50', high: '₹22.30', low: '₹21.40', close: '₹22.00', change: '+2.33%' },
                { date: 'Sep 10', coin: 'Rice', open: '₹29.20', high: '₹30.40', low: '₹29.00', close: '₹30.00', change: '+2.74%' },
              ].map((day, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{day.date}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-green-800">{day.coin}Coin</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{day.open}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{day.high}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{day.low}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">{day.close}</td>
                  <td className={`px-2 py-3 whitespace-nowrap text-sm ${day.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{day.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button className="w-full py-2 text-green-600 border border-green-600 rounded-xl hover:bg-green-50 transition-colors duration-200 text-sm font-medium">
          View Full History
        </button>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-green-900">Recent Transactions</h2>
        
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-green-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {transaction.amount}
                  </p>
                  {transaction.coins && (
                    <p className="text-xs text-gray-500">{transaction.coins}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full py-3 text-green-600 border border-green-600 rounded-xl hover:bg-green-50 transition-colors duration-200 font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default Wallet;