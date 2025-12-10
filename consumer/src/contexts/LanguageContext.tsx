import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'app.title': 'AgriCoin Verify',
    'app.tagline': 'Scan or enter your batch number to verify where your food came from',
    'home.enterBatch': 'Enter Batch ID',
    'home.scanQR': 'Scan QR',
    'verify.title': 'Verify Your Product',
    'verify.inputLabel': 'Enter Batch / Box ID',
    'verify.button': 'Verify',
    'verify.helpLink': 'Need help? Contact farmer',
    'scan.title': 'Scan QR Code',
    'scan.instruction': 'Point your camera at the QR code on your product',
    'scan.fallback': 'Manual Entry',
    'result.verified': 'VERIFIED',
    'result.warning': 'WARNING: POSSIBLE TAMPER',
    'result.notFound': 'NOT FOUND',
    'result.blockchainAudit': 'Blockchain audit',
    'result.tapToView': 'tap to view',
    'result.contactFarmer': 'Contact Farmer',
    'result.soilData': 'Soil & Farm Data',
    'result.soilPH': 'Soil pH',
    'result.fertilizers': 'Fertilizers used',
    'result.organic': 'Organic compost',
    'result.farmArea': 'Farm area',
    'result.harvestDate': 'Harvest date',
    'result.journey': 'Supply Chain Journey',
    'result.originalWeight': 'Original weight',
    'result.reportProblem': 'Report Problem',
    'result.shareProof': 'Share Proof',
    'result.viewBlockchain': 'View Full Blockchain Record',
    'result.comingFrom': 'This {product} came from {farmer} in {village}',
    'journey.farmer': 'Farmer',
    'journey.aggregator': 'Aggregator',
    'journey.transport': 'Transport',
    'journey.retailer': 'Retailer',
    'journey.minted': 'Minted',
    'journey.collected': 'Collected',
    'journey.scanned': 'Scanned',
    'journey.received': 'Received',
    'warnings.DoubleScanAtDifferentGeo': 'Batch ID used at two distant locations within 30 minutes — possible reuse or tampering',
    'warnings.WeightMismatch': 'Weight mismatch detected between original and current package',
    'report.title': 'Report Problem',
    'report.description': 'Describe the issue with this batch',
    'report.photo': 'Add Photo (optional)',
    'report.submit': 'Submit Report',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.offline': 'Offline - Will verify when online'
  },
  hi: {
    'app.title': 'एग्रीकॉइन वेरिफाई',
    'app.tagline': 'अपना बैच नंबर स्कैन करें या दर्ज करें और जानें कि आपका खाना कहाँ से आया है',
    'home.enterBatch': 'बैच आईडी दर्ज करें',
    'home.scanQR': 'QR स्कैन करें',
    'verify.title': 'अपना उत्पाद सत्यापित करें',
    'verify.inputLabel': 'बैच / बॉक्स आईडी दर्ज करें',
    'verify.button': 'सत्यापित करें',
    'verify.helpLink': 'सहायता चाहिए? किसान से संपर्क करें',
    'scan.title': 'QR कोड स्कैन करें',
    'scan.instruction': 'अपने उत्पाद पर QR कोड की ओर कैमरा करें',
    'scan.fallback': 'मैन्युअल एंट्री',
    'result.verified': 'सत्यापित',
    'result.warning': 'चेतावनी: संभावित छेड़छाड़',
    'result.notFound': 'नहीं मिला',
    'result.blockchainAudit': 'ब्लॉकचेन ऑडिट',
    'result.tapToView': 'देखने के लिए टैप करें',
    'result.contactFarmer': 'किसान से संपर्क करें',
    'result.soilData': 'मिट्टी और खेत डेटा',
    'result.soilPH': 'मिट्टी का pH',
    'result.fertilizers': 'उपयोग किए गए उर्वरक',
    'result.organic': 'जैविक खाद',
    'result.farmArea': 'खेत का क्षेत्र',
    'result.harvestDate': 'फसल की तारीख',
    'result.journey': 'आपूर्ति श्रृंखला यात्रा',
    'result.originalWeight': 'मूल वजन',
    'result.reportProblem': 'समस्या की रिपोर्ट करें',
    'result.shareProof': 'प्रमाण साझा करें',
    'result.viewBlockchain': 'पूरा ब्लॉकचेन रिकॉर्ड देखें',
    'result.comingFrom': 'यह {product} {village} के {farmer} से आया है',
    'journey.farmer': 'किसान',
    'journey.aggregator': 'एग्रीगेटर',
    'journey.transport': 'ट्रांसपोर्ट',
    'journey.retailer': 'रिटेलर',
    'journey.minted': 'मिंट किया गया',
    'journey.collected': 'एकत्र किया गया',
    'journey.scanned': 'स्कैन किया गया',
    'journey.received': 'प्राप्त किया गया',
    'warnings.DoubleScanAtDifferentGeo': '30 मिनट के भीतर दो अलग स्थानों पर बैच आईडी का उपयोग - संभावित पुन: उपयोग या छेड़छाड़',
    'warnings.WeightMismatch': 'मूल और वर्तमान पैकेज के बीच वजन में असंगति का पता चला',
    'report.title': 'समस्या की रिपोर्ट करें',
    'report.description': 'इस बैच के साथ समस्या का वर्णन करें',
    'report.photo': 'फोटो जोड़ें (वैकल्पिक)',
    'report.submit': 'रिपोर्ट सबमिट करें',
    'common.yes': 'हाँ',
    'common.no': 'नहीं',
    'common.back': 'वापस',
    'common.loading': 'लोड हो रहा है...',
    'common.offline': 'ऑफलाइन - ऑनलाइन होने पर सत्यापित करेंगे'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};