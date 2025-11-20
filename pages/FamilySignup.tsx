import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeniorProfile } from '../types';
import { saveSenior } from '../services/storageService';
import { User, Heart, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FamilySignup: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Partial<SeniorProfile>>({
    contactName: '',
    seniorName: '',
    seniorAge: 65,
    contact: { email: '', phone: '', address: '', city: '', zip: '' },
    careNeeds: '',
    budgetMax: 0,
    likes: [],
    dislikes: [],
    conditions: [],
  });

  const [tempLike, setTempLike] = useState('');
  const [tempDislike, setTempDislike] = useState('');
  const [tempCondition, setTempCondition] = useState('');

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

  const addToArray = (field: 'likes' | 'dislikes' | 'conditions', value: string, setter: (s: string) => void) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()]
    }));
    setter('');
  };

  const removeArrayItem = (field: 'likes' | 'dislikes' | 'conditions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: SeniorProfile = {
      id: `fam_${Date.now()}`,
      contactName: formData.contactName!,
      seniorName: formData.seniorName!,
      seniorAge: Number(formData.seniorAge),
      contact: formData.contact!,
      careNeeds: formData.careNeeds!,
      budgetMax: Number(formData.budgetMax),
      likes: formData.likes || [],
      dislikes: formData.dislikes || [],
      conditions: formData.conditions || [],
    };
    saveSenior(newProfile);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary-900">{t('fam.reg.title')}</h2>
          <p className="mt-2 text-gray-600">{t('fam.reg.subtitle')}</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">{t('cg.step.1')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700">{t('fam.label.yourname')}</label>
                  <input required type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.email')} <span className="text-red-500">*</span></label>
                  <input required type="email" name="contact.email" value={formData.contact?.email} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.phone')} <span className="text-red-500">*</span></label>
                  <input required type="tel" name="contact.phone" value={formData.contact?.phone} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('cg.label.city')}</label>
                  <input required type="text" name="contact.city" value={formData.contact?.city} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>
            </div>

            {/* Senior Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">{t('fam.label.seniorname')} Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700">{t('fam.label.seniorname')}</label>
                  <input required type="text" name="seniorName" value={formData.seniorName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">{t('fam.label.age')}</label>
                  <input required type="number" name="seniorAge" value={formData.seniorAge} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t('fam.label.needs')}</label>
                <textarea required name="careNeeds" rows={3} value={formData.careNeeds} onChange={handleInputChange} placeholder="e.g., Needs help getting dressed, medication reminders, light cooking." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
              </div>

              {/* Dynamic Lists */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Conditions */}
                <div className="bg-red-50 p-4 rounded-lg">
                   <label className="block text-sm font-medium text-red-800 mb-2 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {t('fam.label.conditions')}</label>
                   <div className="flex space-x-2 mb-2">
                     <input type="text" value={tempCondition} onChange={e => setTempCondition(e.target.value)} className="block w-full text-sm border-gray-300 rounded-md" placeholder={t('fam.placeholder.add')} 
                       onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray('conditions', tempCondition, setTempCondition))}
                     />
                     <button type="button" onClick={() => addToArray('conditions', tempCondition, setTempCondition)} className="bg-red-600 text-white px-3 rounded-md">+</button>
                   </div>
                   <div className="flex flex-wrap gap-1">
                     {formData.conditions?.map((item, i) => (
                       <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                         {item} <button type="button" onClick={() => removeArrayItem('conditions', i)} className="ml-1 text-red-600 font-bold">&times;</button>
                       </span>
                     ))}
                   </div>
                </div>

                {/* Likes */}
                <div className="bg-green-50 p-4 rounded-lg">
                   <label className="block text-sm font-medium text-green-800 mb-2 flex items-center"><Heart className="w-4 h-4 mr-1"/> {t('fam.label.likes')}</label>
                   <div className="flex space-x-2 mb-2">
                     <input type="text" value={tempLike} onChange={e => setTempLike(e.target.value)} className="block w-full text-sm border-gray-300 rounded-md" placeholder={t('fam.placeholder.add')}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray('likes', tempLike, setTempLike))}
                     />
                     <button type="button" onClick={() => addToArray('likes', tempLike, setTempLike)} className="bg-green-600 text-white px-3 rounded-md">+</button>
                   </div>
                   <div className="flex flex-wrap gap-1">
                     {formData.likes?.map((item, i) => (
                       <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                         {item} <button type="button" onClick={() => removeArrayItem('likes', i)} className="ml-1 text-green-600 font-bold">&times;</button>
                       </span>
                     ))}
                   </div>
                </div>

                 {/* Dislikes */}
                <div className="bg-gray-100 p-4 rounded-lg">
                   <label className="block text-sm font-medium text-gray-800 mb-2">{t('fam.label.dislikes')}</label>
                   <div className="flex space-x-2 mb-2">
                     <input type="text" value={tempDislike} onChange={e => setTempDislike(e.target.value)} className="block w-full text-sm border-gray-300 rounded-md" placeholder={t('fam.placeholder.add')}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray('dislikes', tempDislike, setTempDislike))}
                     />
                     <button type="button" onClick={() => addToArray('dislikes', tempDislike, setTempDislike)} className="bg-gray-600 text-white px-3 rounded-md">+</button>
                   </div>
                   <div className="flex flex-wrap gap-1">
                     {formData.dislikes?.map((item, i) => (
                       <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                         {item} <button type="button" onClick={() => removeArrayItem('dislikes', i)} className="ml-1 text-gray-600 font-bold">&times;</button>
                       </span>
                     ))}
                   </div>
                </div>
              </div>

              <div className="pt-4">
                 <label className="block text-sm font-medium text-gray-700">{t('fam.label.budget')}</label>
                 <input type="number" name="budgetMax" value={formData.budgetMax} onChange={handleInputChange} className="mt-1 block w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="ml-3 inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                {t('fam.btn.find')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};