import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">{t('landing.hero.title')}</span>{' '}
                  <span className="block text-primary-600 xl:inline">{t('landing.hero.highlight')}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('landing.hero.subtitle')}
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-primary-50">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop"
            alt="Happy senior couple smiling"
          />
        </div>
      </div>

      {/* Role Selection */}
      <div className="py-12 bg-gray-50 flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">{t('landing.roles.title')}</h2>
            <p className="mt-4 text-lg text-gray-500">{t('landing.roles.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Family Card */}
            <div 
              onClick={() => navigate('/register/family')}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary-200"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary-500 rounded-t-2xl" />
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors">
                  <Users className="h-10 w-10 text-primary-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">{t('landing.family.title')}</h3>
              <p className="text-gray-500 text-center mb-6">
                {t('landing.family.desc')}
              </p>
              <div className="flex justify-center">
                <span className="text-primary-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                  {t('landing.family.btn')} &rarr;
                </span>
              </div>
            </div>

            {/* Caregiver Card */}
            <div 
              onClick={() => navigate('/register/caregiver')}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-warm-200"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-warm-500 rounded-t-2xl" />
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-warm-50 rounded-full group-hover:bg-warm-100 transition-colors">
                  <HeartHandshake className="h-10 w-10 text-warm-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">{t('landing.caregiver.title')}</h3>
              <p className="text-gray-500 text-center mb-6">
                {t('landing.caregiver.desc')}
              </p>
              <div className="flex justify-center">
                <span className="text-warm-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                  {t('landing.caregiver.btn')} &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};