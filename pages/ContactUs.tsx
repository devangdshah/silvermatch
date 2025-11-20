import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactUs: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('contact.title')}</h2>
          <p className="mt-4 text-lg text-gray-500">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 space-y-8">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Get in Touch</h3>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 text-base text-gray-500">
                  <p className="font-medium text-gray-900">{t('contact.phone')}</p>
                  <p className="mt-1"></p>
                  <p className="text-sm text-gray-400">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 text-base text-gray-500">
                  <p className="font-medium text-gray-900">{t('cg.label.email')}</p>
                  <p className="mt-1"></p>
                  <p className="text-sm text-gray-400">We typically reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 text-base text-gray-500">
                  <p className="font-medium text-gray-900">{t('contact.office')}</p>
                  <p className="mt-1">
                    
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="rounded-full bg-green-100 p-4 mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                  <p className="mt-2 text-gray-500">Thanks for reaching out. A member of our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-6 text-primary-600 hover:text-primary-500 font-medium underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.form.name')}</label>
                    <input type="text" name="name" id="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('cg.label.email')}</label>
                    <input type="email" name="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.form.msg')}</label>
                    <textarea id="message" name="message" rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" placeholder="Tell us about your inquiry..."></textarea>
                  </div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    {t('contact.btn.send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};