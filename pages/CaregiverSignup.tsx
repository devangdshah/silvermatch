import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORM_COMMISSION_PERCENT, CaregiverProfile } from '../types';
import { saveCaregiver } from '../services/storageService';
import { Briefcase, DollarSign, User, MapPin, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const CaregiverSignup: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CaregiverProfile> & { rawRate: string }>({
    fullName: '',
    contact: { email: '', phone: '', address: '', city: '', zip: '' },
    experienceYears: 0,
    bio: '',
    specialties: [],
    rawRate: '',
    availability: '',
  });

  const specialtyOptions = [
    'Dementia Care', 'Mobility Assistance', 'Medication Management', 
    'Wound Care', 'Physical Therapy', 'Companionship', 
    'Meal Preparation', 'Driving/Transport', 'Housekeeping'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: { ...prev.contact!, [contactField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleSpecialty = (spec: string) => {
    const current = formData.specialties || [];
    const updated = current.includes(spec) 
      ? current.filter(s => s !== spec)
      : [...current, spec];
    setFormData(prev => ({ ...prev, specialties: updated }));
  };

  const calculateRates = () => {
    const base = parseFloat(formData.rawRate || '0');
    const platformFee = base * PLATFORM_COMMISSION_PERCENT;
    const clientPays = base + platformFee;
    return { base, platformFee, clientPays };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rates = calculateRates();
    
    const newProfile: CaregiverProfile = {
      id: `cg_${Date.now()}`,
      fullName: formData.fullName!,
      contact: formData.contact!,
      experienceYears: Number(formData.experienceYears),
      bio: formData.bio!,
      specialties: formData.specialties!,
      hourlyRate: rates.base,
      platformRate: rates.clientPays,
      availability: formData.availability!,
      isVerified: false // Default state
    };

    saveCaregiver(newProfile);
    navigate('/dashboard');
  };

  const rates = calculateRates();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">{t('cg.reg.title')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            Step {step} of 3: {step === 1 ? t('cg.step.1') : step === 2 ? t('cg.step.2') : t('cg.step.3')}
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-warm-600 mb-4">
                  <User className="h-5 w-5" />
                  <h3 className="text-lg font-medium text-gray-900">{t('cg.step.1')}</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.name')}</label>
                  <input 
                    required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('cg.label.phone')} <span className="text-red-500">*</span></label>
                    <input 
                      required type="tel" name="contact.phone" value={formData.contact?.phone} onChange={handleInputChange}
                      placeholder="555-000-0000"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('cg.label.email')} <span className="text-red-500">*</span></label>
                    <input 
                      required type="email" name="contact.email" value={formData.contact?.email} onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-2 text-gray-500 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('cg.label.address')}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-y-4">
                    <input 
                      required type="text" name="contact.address" placeholder={t('cg.label.address')} value={formData.contact?.address} onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required type="text" name="contact.city" placeholder={t('cg.label.city')} value={formData.contact?.city} onChange={handleInputChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                      />
                      <input 
                        required type="text" name="contact.zip" placeholder={t('cg.label.zip')} value={formData.contact?.zip} onChange={handleInputChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                      />
                    </div>
                  </div>
                </div>

                <button type="button" onClick={() => setStep(2)} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-warm-500 hover:bg-warm-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warm-500">
                  {t('cg.btn.next')}
                </button>
              </div>
            )}

            {/* STEP 2: EXPERIENCE */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-warm-600 mb-4">
                  <Briefcase className="h-5 w-5" />
                  <h3 className="text-lg font-medium text-gray-900">{t('cg.step.2')}</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.exp')}</label>
                  <input 
                    type="number" min="0" name="experienceYears" value={formData.experienceYears} onChange={handleInputChange}
                    className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('cg.label.specs')}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {specialtyOptions.map(spec => (
                      <div 
                        key={spec}
                        onClick={() => toggleSpecialty(spec)}
                        className={`cursor-pointer px-3 py-2 rounded-md text-sm text-center border transition-all ${
                          formData.specialties?.includes(spec)
                            ? 'bg-warm-50 border-warm-500 text-warm-700 font-medium'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.bio')}</label>
                  <textarea 
                    required name="bio" rows={4} value={formData.bio} onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                  />
                </div>

                 <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.avail')}</label>
                  <input 
                    required type="text" name="availability" placeholder="e.g. Mon-Fri 9am-5pm, Weekends only" value={formData.availability} onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-warm-500 focus:border-warm-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    {t('cg.btn.back')}
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-warm-500 hover:bg-warm-600">
                    {t('cg.btn.next')}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: RATES */}
            {step === 3 && (
              <div className="space-y-6">
                 <div className="flex items-center space-x-2 text-warm-600 mb-4">
                  <DollarSign className="h-5 w-5" />
                  <h3 className="text-lg font-medium text-gray-900">{t('cg.step.3')}</h3>
                </div>

                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="text-sm font-bold text-blue-800 mb-2">Platform Commission</h4>
                  <p className="text-sm text-blue-700">
                    SilverMatch takes a flat <strong>{(PLATFORM_COMMISSION_PERCENT * 100).toFixed(0)}% commission</strong> added on top of your hourly rate. This is paid by the client.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.rate')} ($)</label>
                  <div className="mt-1 relative rounded-md shadow-sm w-48">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="rawRate"
                      required
                      min="10"
                      value={formData.rawRate}
                      onChange={handleInputChange}
                      className="focus:ring-warm-500 focus:border-warm-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">/hr</span>
                    </div>
                  </div>
                </div>

                {rates.base > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-gray-600">You Earn:</span>
                      <span className="font-bold text-green-600">${rates.base.toFixed(2)} /hr</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-gray-600">Platform Fee (10%):</span>
                      <span className="text-gray-500">${rates.platformFee.toFixed(2)} /hr</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                      <span className="font-medium text-gray-900">Client Pays:</span>
                      <span className="font-bold text-gray-900 text-lg">${rates.clientPays.toFixed(2)} /hr</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setStep(2)} className="w-1/3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    {t('cg.btn.back')}
                  </button>
                  <button type="submit" className="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {t('cg.btn.complete')}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};