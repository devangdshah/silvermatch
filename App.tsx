import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { CaregiverSignup } from './pages/CaregiverSignup';
import { FamilySignup } from './pages/FamilySignup';
import { Dashboard } from './pages/Dashboard';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { FAQ } from './pages/FAQ';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register/caregiver" element={<CaregiverSignup />} />
          <Route path="/register/family" element={<FamilySignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">{t('app.name')}</h3>
              <p className="text-gray-500 text-sm pr-4">
                {t('landing.hero.subtitle')}
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">{t('nav.contact')}</Link></li>
                <li><Link to="/" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">{t('nav.home')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-3">
                  <li><Link to="/faq" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">{t('nav.faq')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {t('app.name')}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;