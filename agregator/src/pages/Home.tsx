import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { label: 'Farmers', value: 23, color: 'text-green-600' },
    { label: 'Batches Collected', value: '1200kg', color: 'text-yellow-600' },
    { label: 'Deliveries Pending', value: 8, color: 'text-orange-600' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Message */}
      <div className="pt-2">
        <p className="text-green-700">Welcome back, Rajesh</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 font-medium">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.color.replace('text', 'bg').replace('600', '100')} flex items-center justify-center`}>
                <div className={`w-6 h-6 rounded-full ${stat.color.replace('text', 'bg')}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-green-900">Quick Actions</h2>
        
        <Link 
          to="/scan"
          className="block w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl shadow-sm transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Plus size={20} />
            </div>
            <div>
              <p className="font-semibold">New Batch</p>
              <p className="text-green-100 text-sm">Scan and mint AgriCoins</p>
            </div>
          </div>
        </Link>

        <button className="block w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-900 p-4 rounded-xl shadow-sm transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <ShoppingCart size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold">Marketplace</p>
              <p className="text-yellow-800 text-sm">Connect with buyers</p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-green-900">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { time: '2 hours ago', action: 'Onion batch collected from Ramesh', amount: '+25 coins' },
            { time: '1 day ago', action: 'Sold wheat batch to BigBasket', amount: '₹850' },
            { time: '2 days ago', action: 'New farmer Sita registered', amount: '' },
          ].map((activity, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-green-900 font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                {activity.amount && (
                  <span className={`text-sm font-semibold ${activity.amount.startsWith('+') ? 'text-green-600' : 'text-yellow-600'}`}>
                    {activity.amount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;