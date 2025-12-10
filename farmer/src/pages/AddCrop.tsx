import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User, Check, Coins } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { format } from 'date-fns';

const AddCrop: React.FC = () => {
  const navigate = useNavigate();
  const { addCoins, addTransaction } = useWallet();
  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    notes: ''
  });
  const [showCameraUI, setShowCameraUI] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [buttonProgress, setButtonProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [walletUpdated, setWalletUpdated] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);

  const cropTypes = ['Onion', 'Potato', 'Wheat', 'Rice', 'Corn'];

  useEffect(() => {
    if (isHolding && buttonProgress < 100) {
      timerRef.current = window.setTimeout(() => {
        setButtonProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            setIsHolding(false);
            setWalletBalance(1);
            setWalletUpdated(true);
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isHolding, buttonProgress]);

  // Start camera UI flow immediately when component mounts
  useEffect(() => {
    setShowCameraUI(true);
    
    // Request camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          const videoElement = document.getElementById('camera-feed') as HTMLVideoElement;
          if (videoElement) {
            videoElement.srcObject = stream;
          }
          
          // Simulate scanning process after camera starts
          setTimeout(() => {
            // Stop the camera stream
            stream.getTracks().forEach(track => track.stop());
            
            setScanComplete(true);
            setTimeout(() => {
              setShowButton(true);
            }, 1000);
          }, 3000);
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          alert('Unable to access camera. Please ensure camera permissions are granted.');
        });
    } else {
      alert('Your browser does not support camera access.');
    }
    
    return () => {
      // Cleanup camera stream when component unmounts
      const videoElement = document.getElementById('camera-feed') as HTMLVideoElement;
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleButtonDown = () => {
    setIsHolding(true);
  };

  const handleButtonUp = () => {
    setIsHolding(false);
    if (buttonProgress < 100) {
      setButtonProgress(0);
    }
  };

  const handleComplete = () => {
    // Add 1 AgriCoin to the wallet
    addCoins(1);
    
    // Add transaction for the verification
    const today = format(new Date(), 'dd MMM');
    
    addTransaction({
      date: today,
      type: 'minted',
      description: 'Farmer verification completed',
      amount: 1,
      inr: 20 // 1 AgriCoin = ₹20
    });
    
    // Notify user
    alert(`You have received 1 AgriCoin.`);
    
    // Check the current path to determine where to navigate back to
    const currentPath = window.location.pathname;
    if (currentPath.includes('/crops')) {
      navigate('/crops');
    } else {
      navigate('/delivery');
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => {
            const currentPath = window.location.pathname;
            if (currentPath.includes('/crops')) {
              navigate('/crops');
            } else {
              navigate('/delivery');
            }
          }}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-green-900">Farmer Verification</h1>
      </div>

      {showCameraUI && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md bg-black rounded-xl overflow-hidden relative">
            <div className="aspect-[3/4] bg-gray-800 relative flex items-center justify-center">
              {!scanComplete ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-green-400 overflow-hidden">
                      <video 
                        id="camera-feed"
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover"
                      ></video>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs">SCANNING</span>
                    </div>
                    <Camera size={20} className="text-white" />
                  </div>
                  <div className="absolute w-64 h-64 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-green-400 border-dashed animate-pulse"></div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-64 h-64 border-2 border-green-500 flex items-center justify-center bg-green-500 bg-opacity-10">
                    <Check size={80} className="text-green-500" />
                  </div>
                  <p className="text-green-500 font-bold mt-6 text-xl">IDENTITY VERIFIED</p>
                  {showButton && (
                    <div className="mt-8 flex flex-col items-center">
                      <p className="text-white mb-4">Press and hold for 10 seconds to receive AgriCoin</p>
                      <div className="relative">
                        <button
                          ref={buttonRef}
                          onMouseDown={handleButtonDown}
                          onMouseUp={handleButtonUp}
                          onMouseLeave={handleButtonUp}
                          onTouchStart={handleButtonDown}
                          onTouchEnd={handleButtonUp}
                          className={`w-24 h-24 rounded-full flex items-center justify-center ${isHolding ? 'animate-pulse' : ''}`}
                          style={{
                            background: `radial-gradient(circle, rgba(34,197,94,1) 0%, rgba(22,163,74,1) 100%)`,
                            boxShadow: `0 0 ${isHolding ? '20px' : '10px'} rgba(34,197,94,0.7)`
                          }}
                        >
                          <Coins size={40} className="text-white" />
                        </button>
                        {buttonProgress > 0 && buttonProgress < 100 && (
                          <div className="absolute -bottom-8 left-0 w-full">
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${buttonProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      {walletUpdated && (
                        <div className="mt-8 text-center">
                          <p className="text-green-500 font-bold text-xl mb-2">+1 AgriCoin Added!</p>
                          <p className="text-white">Current Balance: {walletBalance} AgriCoin</p>
                          <button 
                            onClick={handleComplete}
                            className="mt-4 bg-green-600 text-white rounded-lg px-6 py-2 font-medium hover:bg-green-700 transition-colors"
                          >
                            Continue
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Important:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Farmer verification is required for all platform activities</li>
          <li>• AgriCoins are awarded for sustainable farming practices</li>
          <li>• Your identity is securely verified through facial recognition</li>
          <li>• Verification is valid for 24 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCrop;