import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutUs: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="relative bg-primary-700 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
            alt="Senior care compassion"
            className="w-full h-full object-cover"
          />
           <div className="absolute inset-0 bg-primary-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">{t('about.title')}</h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-primary-100 shadow-black drop-shadow-md">
            {t('about.hero')}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-primary-600 tracking-wide uppercase">{t('about.vision')}</p>
          <h2 className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
            {t('about.vision.title')}
          </h2>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            [Placeholder: We believe that finding the right caregiver shouldn't be a transaction, but a relationship built on trust and compatibility.]
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900">{t('about.mission')}</h3>
                <p className="text-lg text-gray-500">
                    [Placeholder: To revolutionize senior care by prioritizing personality matches alongside medical needs. We strive to reduce caregiver turnover and increase senior happiness.]
                </p>
            </div>
            <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900">{t('about.story')}</h3>
                <p className="text-lg text-gray-500">
                    [Placeholder: Founded in 2024, SilverMatch began when our founders struggled to find reliable care for their own parents. They realized the system was broken and decided to fix it.]
                </p>
            </div>
            <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900">{t('about.values')}</h3>
                <p className="text-lg text-gray-500">
                    [Placeholder: Integrity, Compassion, Transparency, and Excellence. We hold our caregivers and our team to the highest standards.]
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};