import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { WalletProvider } from './context/WalletContext';
import Delivery from './pages/Delivery';
import AddCrop from './pages/AddCrop';
import Market from './pages/Market';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Crops from './pages/Crops';

function App() {
  return (
    <LanguageProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Navigate to="/wallet" replace />} />
            <Route path="/delivery" element={<Layout><Delivery /></Layout>} />
            <Route path="/delivery/add" element={<Layout><AddCrop /></Layout>} />
            <Route path="/crops" element={<Layout><Crops /></Layout>} />
            <Route path="/crops/add" element={<Layout><AddCrop /></Layout>} />
            <Route path="/market" element={<Layout><Market /></Layout>} />
            <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
          </Routes>
          </div>
        </Router>
      </WalletProvider>
    </LanguageProvider>
  );
}

export default App;