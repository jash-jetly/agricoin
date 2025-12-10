import React from 'react';
import { Plus, CheckCircle, Clock, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Delivery: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Empty crops for new user experience
  const crops: Array<{
    id: number;
    type: string;
    quantity: number;
    status: string;
    earned: number;
    estimatedCoins: number;
    date: string;
  }> = [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-50';
      case 'Pending Pickup':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-900">Delivery</h1>
        <span className="text-sm text-gray-600">{crops.length} crops</span>
      </div>

      {/* Add New Crop Button */}
      <button
        onClick={() => navigate('/delivery/add')}
        className="w-full bg-green-600 text-white rounded-lg p-4 flex items-center justify-center space-x-3 hover:bg-green-700 transition-colors"
      >
        <Plus size={20} />
        <span className="font-medium">Add New Crop</span>
      </button>

      {/* Crops List */}
      <div className="space-y-3">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">{crop.type}</h3>
                <p className="text-sm text-gray-600">{crop.quantity} kg</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{crop.date}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                {getStatusIcon(crop.status)}
                <span>{crop.status}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Coins size={14} className="text-yellow-600" />
                {crop.status === 'Delivered' ? (
                  <span className="text-sm text-green-600 font-medium">{crop.earned} earned</span>
                ) : (
                  <span className="text-sm text-gray-500">Est. {crop.estimatedCoins}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Declare your crop availability</li>
          <li>• Aggregator confirms and schedules pickup</li>
          <li>• AgriCoins are minted after delivery confirmation</li>
          <li>• Coins appear in your wallet automatically</li>
        </ul>
      </div>
    </div>
  );
};

export default Delivery;