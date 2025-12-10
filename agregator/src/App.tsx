import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Farmers from './pages/Farmers';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <div className="max-w-sm mx-auto relative pb-20">
            <TopNav />
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <BottomNav />
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;