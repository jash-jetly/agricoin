import React, { useState, useRef, useEffect } from 'react';
import { Camera, Plus, X, User } from 'lucide-react';
import { identifyVegetable } from '../services/geminiService';
import { useToast } from '../context/ToastContext';

const Scan = () => {
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [weight, setWeight] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isMintingMode, setIsMintingMode] = useState(false);
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [buttonPressTime, setButtonPressTime] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [farmerWallet, setFarmerWallet] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonPressTimer = useRef<NodeJS.Timeout | null>(null);
  const { showToast } = useToast();
  
  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [cameraActive, isFaceScanning]);
  
  const startCamera = async () => {
    try {
      // Use front camera when in face scanning mode, otherwise use environment (back) camera
      const facingMode = isFaceScanning ? 'user' : 'environment';
      
      try {
        // First try with the preferred camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false
        });
        
        setHasPermission(true);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (initialError) {
        console.warn('Could not access preferred camera, trying fallback:', initialError);
        
        // If preferred camera fails, try with any available camera
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        
        setHasPermission(true);
        
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
        }
        
        // Inform user we're using a fallback camera
        if (isFaceScanning) {
          showToast('Front camera not available. Using available camera instead.', 'info');
        } else {
          showToast('Back camera not available. Using available camera instead.', 'info');
        }
      }
    } catch (err) {
      console.error('Error accessing any camera:', err);
      setHasPermission(false);
      showToast('Camera access denied. Please enable camera permissions in your browser/device settings.', 'error');
      
      // Provide a mock verification option when camera fails
      if (isFaceScanning) {
        showToast('Using simulated verification due to camera access issues.', 'info');
      }
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataUrl);
    
    // Stop camera after capturing
    setCameraActive(false);
    setIsScanning(true);
    
    try {
      // Send image to Gemini for vegetable identification
      const identifiedCrop = await identifyVegetable(imageDataUrl);
      
      // Check if the identified crop is in our list
      const normalizedCrop = identifiedCrop.charAt(0).toUpperCase() + identifiedCrop.slice(1).toLowerCase();
      const matchedCrop = crops.find(crop => 
        crop.toLowerCase() === normalizedCrop.toLowerCase() ||
        normalizedCrop.toLowerCase().includes(crop.toLowerCase())
      );
      
      if (matchedCrop) {
        setSelectedCrop(matchedCrop);
        // Set weight to 1kg automatically
        setWeight('1');
        // Show success notification
        showToast(` AI identified: ${matchedCrop}`, 'success');
      } else {
        // Show notification that crop was identified but not in our list
        showToast(`AI identified "${normalizedCrop}" but it's not in our crop list. Please select manually.`, 'info');
      }
      
      setIsScanning(false);
    } catch (error) {
      console.error('Error identifying crop:', error);
      setIsScanning(false);
      showToast('Failed to identify the crop. Please select manually.', 'error');
    }
  };
  
  const resetCamera = () => {
    setCapturedImage(null);
    setCameraActive(false);
    setIsScanning(false);
  };

  const farmers = [
    'Aditya Chouske',
    'Mini Nayak',
    'Jash Jetly',
    'Mahek Yadav',
  ];

  const crops = [
    'Onion',
    'Tomato',
    'Wheat',
    'Rice',
    'Cotton',
    'Sugarcane',
    'Potato',
  ];

  const handleMintCoins = () => {
    if (!selectedFarmer || !selectedCrop) {
      showToast('Please select a farmer and scan a crop', 'error');
      return;
    }
    
    // Start the minting process with face scanning
    setIsMintingMode(true);
    setIsFaceScanning(true);
    
    // First stop any existing camera stream
    stopCamera();
    
    // Then activate camera with front-facing mode
    setCameraActive(true);
    setFarmerWallet(1); // Set initial wallet value for demonstration
    
    showToast('Activating camera for farmer verification', 'info');
  };
  
  const startButtonPress = () => {
    setIsButtonPressed(true);
    setButtonPressTime(0);
    
    // Start the timer to track button press duration
    buttonPressTimer.current = setInterval(() => {
      setButtonPressTime(prev => {
        const newTime = prev + 0.1;
        
        // When 10 seconds is reached, complete the transaction
        if (newTime >= 10) {
          completeTransaction();
          clearInterval(buttonPressTimer.current as NodeJS.Timeout);
          return 10;
        }
        
        return newTime;
      });
    }, 100);
  };
  
  const stopButtonPress = () => {
    setIsButtonPressed(false);
    if (buttonPressTimer.current) {
      clearInterval(buttonPressTimer.current);
    }
    
    // If button was released before 10 seconds, reset the timer
    if (buttonPressTime < 10) {
      setButtonPressTime(0);
      showToast('Please hold the button for 10 seconds to complete the transaction', 'info');
    }
  };
  
  const completeTransaction = () => {
    // Simulate transaction completion
    setTransactionComplete(true);
    setFarmerWallet(prev => prev + 1);
    showToast(`Successfully transferred 1 AgriCoin to ${selectedFarmer}!`, 'success');
    
    // Reset after 3 seconds
    setTimeout(() => {
      // Reset form
      setSelectedFarmer('');
      setSelectedCrop('');
      setCapturedImage(null);
      setIsMintingMode(false);
      setIsFaceScanning(false);
      setFaceCaptured(false);
      setButtonPressTime(0);
      setIsButtonPressed(false);
      setTransactionComplete(false);
      setCameraActive(false);
    }, 3000);
  };
  
  const captureFace = () => {
    setFaceCaptured(true);
    setIsFaceScanning(false);
    showToast('Farmer verified! Press and hold the green button for 10 seconds to mint AgriCoin', 'success');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Scan Instructions */}
      <div className="pt-2">
        <p className="text-green-700">Capture crop images and mint AgriCoins</p>
      </div>

      {/* Camera Component */}
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <div className="aspect-square bg-gray-800 flex items-center justify-center relative">
          {isMintingMode ? (
            <div className="relative w-full h-full">
              {faceCaptured ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-4">
                  {transactionComplete ? (
                    <div className="text-center">
                      <div className="text-xl text-white mb-6">Transaction Complete</div>
                      <div className="bg-green-100 p-4 rounded-xl text-green-800 mb-4">
                        <div className="text-center mb-2">Transaction Details:</div>
                        <div className="flex justify-between">
                          <span>From:</span>
                          <span>Your Wallet</span>
                        </div>
                        <div className="flex justify-between">
                          <span>To:</span>
                          <span>{selectedFarmer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>1 AgriCoin</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-white text-xl mb-6 text-center">Press and hold the button for 10 seconds to mint AgriCoin</div>
                      <div 
                        className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${isButtonPressed ? 'scale-95' : 'scale-100'} transition-transform duration-200 ${buttonPressTime > 0 ? 'animate-pulse' : ''}`}
                        style={{
                          background: `radial-gradient(circle, rgba(34,197,94,1) 0%, rgba(22,163,74,1) 100%)`,
                          boxShadow: '0 0 20px rgba(34,197,94,0.8)'
                        }}
                        onMouseDown={startButtonPress}
                        onMouseUp={stopButtonPress}
                        onMouseLeave={stopButtonPress}
                        onTouchStart={startButtonPress}
                        onTouchEnd={stopButtonPress}
                      >
                        <div className="text-white text-xl font-bold">PRESS</div>
                      </div>
                      <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full transition-all duration-100"
                          style={{ width: `${(buttonPressTime / 10) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-white mt-2">{Math.floor(buttonPressTime)} seconds</div>
                      <div className="mt-6 text-gray-300">Farmer's Wallet: {farmerWallet} AgriCoin</div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {hasPermission === false ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-6">
                      <User size={100} className="text-green-500 mb-6" />
                      <div className="text-white text-center mb-6">
                        <p className="text-xl font-bold mb-2">Camera Permission Denied</p>
                        <p className="text-gray-400">We can't access your camera for verification.</p>
                      </div>
                      <button 
                        onClick={captureFace}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                      >
                        Continue with Simulated Verification
                      </button>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black to-transparent">
                          <div className="text-white text-lg font-medium">Scanning Farmer's Face</div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-64 h-64 border-4 border-green-500 rounded-full opacity-70 flex items-center justify-center">
                            <User size={100} className="text-green-500 animate-pulse" />
                          </div>
                        </div>
                        <div className="absolute bottom-10 left-0 w-full flex justify-center">
                          <button 
                            onClick={captureFace}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
                          >
                            Verify Farmer
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ) : capturedImage ? (
            <div className="relative w-full h-full">
              <img 
                src={capturedImage} 
                alt="Captured crop" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-0 left-0 w-full p-2 flex justify-between">
                <button 
                  onClick={resetCamera}
                  className="bg-white p-2 rounded-full shadow-lg"
                >
                  <X size={20} className="text-red-600" />
                </button>
                {isScanning && (
                  <div className="bg-green-600 px-3 py-1 rounded-full text-white text-sm font-medium animate-pulse">
                    Analyzing with Gemini AI...
                  </div>
                )}
              </div>
            </div>
          ) : cameraActive ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-white rounded-lg opacity-70"></div>
              </div>
              <button 
                onClick={captureImage}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Camera size={24} className="text-white" />
                </div>
              </button>
            </div>
          ) : (
            <div className="text-center text-white">
              <Camera size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400 mb-4">Camera preview will appear here</p>
              <button 
                onClick={() => setCameraActive(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Start Camera
              </button>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-green-900 mb-2">
            Select Farmer
          </label>
          <select
            value={selectedFarmer}
            onChange={(e) => setSelectedFarmer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-green-900"
          >
            <option value="">Choose a farmer</option>
            {farmers.map((farmer) => (
              <option key={farmer} value={farmer}>
                {farmer}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-900 mb-2">
            Crop
          </label>
          <div className="w-full p-3 border border-gray-300 rounded-xl bg-white text-green-900">
            {selectedCrop || 'Waiting for scan...'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-900 mb-2">
            Weight (kg)
          </label>
          <div className="w-full p-3 border border-gray-300 rounded-xl bg-white text-green-900">
            1.088kg
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-900 mb-2">
            Box No.
          </label>
          <div className="w-full p-3 border border-gray-300 rounded-xl bg-white text-green-900">
            16045
          </div>
        </div>
      </div>

      {/* Mint Button */}
      <button
        onClick={handleMintCoins}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Plus size={20} />
        <span>Mint AgriCoins</span>
      </button>

      {/* Info Card */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">How it works:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Scan the batch using camera</li>
          <li>• Select farmer and crop type</li>
          <li>• Enter accurate weight</li>
          <li>• Mint AgriCoins instantly</li>
        </ul>
      </div>
    </div>
  );
};

export default Scan;
