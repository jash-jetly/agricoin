import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import Verify from './pages/Verify';
import Scan from './pages/Scan';
import Result from './pages/Result';
import Report from './pages/Report';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/result/:batchId" element={<Result />} />
            <Route path="/report/:batchId" element={<Report />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;