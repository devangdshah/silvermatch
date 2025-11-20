import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, LogOut, Globe } from 'lucide-react';
import { logout, getActiveUser } from '../services/storageService';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = getActiveUser();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLanding = location.pathname === '/';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Heart className="h-8 w-8 text-primary-600 mr-2 fill-current" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">{t('app.name')}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Language Toggle */}
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 cursor-pointer">
              <Globe className="h-4 w-4 text-gray-500 mr-2" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as 'en' | 'gu')}
                className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer outline-none"
              >
                <option value="en">English</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </div>

            {/* Guest Navigation */}
            {!user && (
              <div className="hidden md:flex items-center space-x-6">
                {!isLanding && (
                   <Link to="/" className="text-gray-500 hover:text-primary-600 font-medium text-sm">
                     {t('nav.home')}
                   </Link>
                )}
                <Link to="/about" className="text-gray-500 hover:text-primary-600 font-medium text-sm">
                  {t('nav.about')}
                </Link>
                <Link to="/contact" className="text-gray-500 hover:text-primary-600 font-medium text-sm">
                  {t('nav.contact')}
                </Link>
                 <Link to="/faq" className="text-gray-500 hover:text-primary-600 font-medium text-sm">
                  {t('nav.faq')}
                </Link>
              </div>
            )}
            
            {/* Logged In Navigation */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 font-medium hover:text-primary-600 transition-colors"
                >
                  {t('nav.dashboard')}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  {t('nav.logout')}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};