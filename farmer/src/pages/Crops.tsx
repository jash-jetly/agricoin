import React from 'react';
import { Plus, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Crops: React.FC = () => {
  const navigate = useNavigate();

  // Empty crops for new user experience
  const crops: Array<{
    id: number;
    type: string;
    quantity: number;
    status: string;
    earned: number;
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
        <h1 className="text-2xl font-bold text-green-900">My Crops</h1>
        <span className="text-sm text-gray-600">{crops.length} crops</span>
      </div>

      {/* Add New Crop Button */}
      <button
        onClick={() => navigate('/crops/add')}
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
                <p className="text-sm font-semibold text-green-600">{crop.earned} coins</p>
                <p className="text-xs text-gray-500">{crop.date}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                {getStatusIcon(crop.status)}
                <span>{crop.status}</span>
              </div>
              
              {crop.status === 'Delivered' ? (
                <span className="text-xs text-green-600 font-medium">✓ Earned</span>
              ) : (
                <span className="text-xs text-gray-500">Est. {crop.earned} coins</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crops;