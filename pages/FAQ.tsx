import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <HelpCircle className="mx-auto h-12 w-12 text-primary-500 mb-4" />
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('faq.title')}</h2>
            <p className="mt-4 text-lg text-gray-500">{t('faq.subtitle')}</p>
        </div>
        
        <div className="space-y-8">
            {/* Families Section */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-primary-50 border-b border-primary-100">
                    <h3 className="text-lg leading-6 font-medium text-primary-900">{t('faq.fam')}</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6 space-y-6">
                    <div>
                        <h4 className="text-base font-bold text-gray-900">How does the matching process work?</h4>
                        <p className="mt-2 text-gray-500"></p>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-gray-900">How do you verify caregivers?</h4>
                        <p className="mt-2 text-gray-500"></p>
                    </div>
                     <div>
                        <h4 className="text-base font-bold text-gray-900">What happens if the match doesn't work out?</h4>
                        <p className="mt-2 text-gray-500"></p>
                    </div>
                </div>
            </div>

            {/* Caregivers Section */}
             <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-warm-50 border-b border-warm-100">
                    <h3 className="text-lg leading-6 font-medium text-warm-900">{t('faq.cg')}</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6 space-y-6">
                    <div>
                        <h4 className="text-base font-bold text-gray-900">When and how do I get paid?</h4>
                        <p className="mt-2 text-gray-500"></p>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-gray-900">How much does it cost to join?</h4>
                        <p className="mt-2 text-gray-500"></p>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-gray-900">Can I set my own schedule?</h4>
                        <p className="mt-2 text-gray-500"></p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};