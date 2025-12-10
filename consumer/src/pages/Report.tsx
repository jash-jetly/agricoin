import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';

export default function Report() {
  const { batchId } = useParams<{ batchId: string }>();
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    alert('Report submitted successfully! We will investigate and contact you if needed.');
    navigate(`/result/${batchId}`);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title={t('report.title')} showBack />
      
      <div className="px-6 py-8">
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Reporting issue for batch: <span className="font-medium">{batchId}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              {t('report.description')}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Please describe what seems wrong with this batch..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('report.photo')}
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  {photo ? photo.name : 'Tap to add a photo'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!description.trim() || isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            {isSubmitting ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{isSubmitting ? 'Submitting...' : t('report.submit')}</span>
          </button>
        </form>
      </div>
    </div>
  );
}