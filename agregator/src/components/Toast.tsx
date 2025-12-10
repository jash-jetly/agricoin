import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-white" size={18} />;
      case 'error':
        return <AlertCircle className="text-white" size={18} />;
      case 'info':
        return <Info className="text-white" size={18} />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'info':
        return 'bg-blue-600';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`${getBackgroundColor()} text-white px-4 py-3 rounded-lg shadow-lg flex items-center max-w-xs`}>
        <div className="mr-2">
          {getIcon()}
        </div>
        <div className="flex-1 mr-2 text-sm">
          {message}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white hover:text-gray-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;