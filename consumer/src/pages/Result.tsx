import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, ShieldAlert, Phone, MessageCircle, MapPin, Calendar, Beaker, Tractor, ExternalLink, AlertTriangle, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import { getVerificationData, type VerificationData } from '../services/api';

export default function Result() {
  const { batchId } = useParams<{ batchId: string }>();
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedJourney, setExpandedJourney] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      if (!batchId) return;
      
      try {
        const result = await getVerificationData(batchId);
        setData(result);
      } catch (error) {
        console.error('Error fetching verification data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [batchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Verification Result" showBack />
        <div className="px-6 py-8 text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('result.notFound')}</h2>
          <p className="text-gray-600">Batch ID {batchId} was not found in our database.</p>
        </div>
      </div>
    );
  }

  const statusColors = {
    VERIFIED: 'bg-green-100 text-green-800 border-green-200',
    WARNING: 'bg-red-100 text-red-800 border-red-200',
    NOT_FOUND: 'bg-gray-100 text-gray-800 border-gray-200',
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const StatusIcon = data.status === 'VERIFIED' ? Shield : ShieldAlert;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={`Batch ${batchId}`} showBack />
      
      <div className="px-4 py-6 space-y-6">
        {/* Status Badge */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium ${statusColors[data.status]} mb-3`}>
            <StatusIcon className="w-4 h-4 mr-2" />
            {t(`result.${data.status.toLowerCase()}`)}
          </div>
          
          <button className="text-xs text-gray-500 flex items-center space-x-1">
            <span>{t('result.blockchainAudit')}: txHash: {data.journey[0]?.tx.slice(0, 10)}...</span>
            <ExternalLink className="w-3 h-3" />
            <span>({t('result.tapToView')})</span>
          </button>
        </div>

        {/* Farmer Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {data.farmer.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{data.farmer.name}</h3>
              <p className="text-sm text-gray-600">{data.farmer.village}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Product Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-700 text-sm leading-relaxed">
            This onion came from <span className="font-semibold">{data.farmer.name}</span> in <span className="font-semibold">{data.farmer.village}</span>. 
            Soil pH: <span className="font-semibold">{data.soil.ph}</span>. 
            It was picked on <span className="font-semibold">{new Date(data.harvestDate).toLocaleDateString()}</span> and 
            reached your shop on <span className="font-semibold">{new Date(data.journey[data.journey.length - 1].time).toLocaleDateString()}</span>.
          </p>
        </div>

        {/* Soil & Farm Data */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Beaker className="w-5 h-5 mr-2 text-green-600" />
            {t('result.soilData')}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">{t('result.soilPH')}:</span>
              <span className="font-medium ml-1">{data.soil.ph}</span>
            </div>
            <div>
              <span className="text-gray-600">{t('result.farmArea')}:</span>
              <span className="font-medium ml-1">{data.farmAreaHectares} ha</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">{t('result.fertilizers')}:</span>
              <span className="font-medium ml-1">{data.soil.fertilizers.join(', ')}</span>
            </div>
            <div>
              <span className="text-gray-600">{t('result.organic')}:</span>
              <span className="font-medium ml-1">{data.soil.organic ? t('common.yes') : t('common.no')}</span>
            </div>
            <div>
              <span className="text-gray-600">{t('result.harvestDate')}:</span>
              <span className="font-medium ml-1">{new Date(data.harvestDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <button
            onClick={() => setExpandedJourney(!expandedJourney)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Tractor className="w-5 h-5 mr-2 text-green-600" />
              {t('result.journey')}
            </h3>
            <span className="text-sm text-gray-500">
              {expandedJourney ? 'Collapse' : 'Expand'}
            </span>
          </button>
          
          <div className={`space-y-3 ${!expandedJourney ? 'max-h-20 overflow-hidden' : ''}`}>
            {data.journey.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-gray-900">
                      {t(`journey.${step.actor.toLowerCase()}`)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {t(`journey.${step.action.toLowerCase()}`)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{step.location}</span>
                    <Calendar className="w-3 h-3 ml-2" />
                    <span>{new Date(step.time).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    tx: {step.tx.slice(0, 12)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weight Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">{t('result.originalWeight')}:</span>
            <span className="font-medium">{data.weightKg} kg</span>
          </div>
        </div>

        {/* Warnings */}
        {data.warnings && data.warnings.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-800 mb-2">Warning Details:</h4>
                <ul className="space-y-1 text-sm text-red-700">
                  {data.warnings.map((warning, index) => (
                    <li key={index}>• {t(`warnings.${warning}`)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/report/${batchId}`)}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t('result.reportProblem')}</span>
          </button>
          
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>{t('result.shareProof')}</span>
          </button>
          
          <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>{t('result.viewBlockchain')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}