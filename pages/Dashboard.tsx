import React, { useEffect, useState } from 'react';
import { getActiveUser, getCaregivers, getCurrentSeniorProfile, getCurrentCaregiverProfile } from '../services/storageService';
import { findMatches } from '../services/geminiService';
import { MatchResult, CaregiverProfile, SeniorProfile } from '../types';
import { Star, Loader, Phone, Mail, Tag, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const user = getActiveUser();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [allCaregivers, setAllCaregivers] = useState<CaregiverProfile[]>([]);
  
  // Family Specific State
  const [seniorProfile, setSeniorProfile] = useState<SeniorProfile | undefined>(undefined);
  
  // Caregiver Specific State
  const [myProfile, setMyProfile] = useState<CaregiverProfile | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const caregivers = getCaregivers();
      setAllCaregivers(caregivers);

      if (user?.type === 'FAMILY') {
        const profile = getCurrentSeniorProfile(user.id);
        setSeniorProfile(profile);
        if (profile) {
          // THIS IS WHERE THE MAGIC HAPPENS
          // Pass the current language to get reasoning in correct language
          const results = await findMatches(profile, caregivers, language);
          setMatches(results);
        }
      } else if (user?.type === 'CAREGIVER') {
        const profile = getCurrentCaregiverProfile(user.id);
        setMyProfile(profile);
      }
      setLoading(false);
    };

    loadData();
  }, [user, language]); // Re-run when language changes to get translated AI response

  if (!user) return <div className="p-8 text-center">Please log in.</div>;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader className="h-12 w-12 text-primary-600 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Consulting our AI matching engine...</p>
      </div>
    );
  }

  // CAREGIVER VIEW
  if (user.type === 'CAREGIVER' && myProfile) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('dash.welcome')}, {myProfile.fullName}</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 bg-warm-50 border-b border-warm-100">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Your Caregiver Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">This is what families see.</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('cg.label.name')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{myProfile.fullName}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Public Hourly Rate</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${myProfile.platformRate.toFixed(2)} / hr</dd>
              </div>
               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Your Take Home</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold text-green-600">${myProfile.hourlyRate.toFixed(2)} / hr</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('cg.label.exp')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{myProfile.experienceYears} Years</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('cg.label.specs')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {myProfile.specialties.map(s => (
                      <span key={s} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('cg.label.bio')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{myProfile.bio}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
            <h4 className="font-bold text-blue-800 flex items-center"><Info className="w-4 h-4 mr-2"/> Application Status</h4>
            <p className="text-sm text-blue-700 mt-1">
                Your profile is live. We will notify you via email ({myProfile.contact.email}) when a family requests a connection.
            </p>
        </div>
      </div>
    );
  }

  // FAMILY VIEW
  if (user.type === 'FAMILY' && seniorProfile) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="mb-10 text-center">
           <h1 className="text-3xl font-bold text-gray-900">{t('dash.matches.title')} {seniorProfile.seniorName}</h1>
           <p className="mt-2 text-gray-500">{t('dash.matches.subtitle')} {seniorProfile.conditions.length} {t('dash.matches.conditions')} {t('dash.matches.subtitle')} {seniorProfile.likes.length} {t('dash.matches.prefs')}.</p>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-12">
             <p>{t('dash.nomatch')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {matches.map((match) => {
              const caregiver = allCaregivers.find(c => c.id === match.caregiverId);
              if (!caregiver) return null;

              return (
                <div key={match.caregiverId} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
                  {/* Header with Match Score */}
                  <div className={`h-2 w-full ${match.score > 85 ? 'bg-green-500' : match.score > 70 ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                  
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{caregiver.fullName}</h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          {caregiver.experienceYears} {t('dash.exp')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-700">${caregiver.platformRate}</div>
                        <div className="text-xs text-gray-400">/ hr</div>
                      </div>
                    </div>

                    {/* AI Reasoning Badge */}
                    <div className="mb-4 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide">{t('dash.match.analysis')}</span>
                         <span className={`text-sm font-bold ${match.score > 85 ? 'text-green-600' : 'text-gray-600'}`}>
                           {match.score}% Match
                         </span>
                      </div>
                      <p className="text-sm text-indigo-900 italic">"{match.reasoning}"</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {match.tags.map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            <Tag className="w-3 h-3 mr-1" /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase">{t('cg.label.specs')}</h4>
                        <div className="flex flex-wrap gap-1">
                            {caregiver.specialties.slice(0,3).map(s => (
                                <span key={s} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-600">{s}</span>
                            ))}
                            {caregiver.specialties.length > 3 && <span className="text-xs text-gray-400 ml-1">+{caregiver.specialties.length - 3} more</span>}
                        </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                     <button className="flex-1 flex justify-center items-center py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
                        <Phone className="w-4 h-4 mr-2" /> {t('dash.btn.contact')}
                     </button>
                     <button className="ml-3 flex-1 flex justify-center items-center py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        <Mail className="w-4 h-4 mr-2" /> {t('dash.btn.message')}
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return <div>Invalid State</div>;
};