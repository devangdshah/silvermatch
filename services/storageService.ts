import { CaregiverProfile, SeniorProfile } from '../types';

const CAREGIVER_KEY = 'silvermatch_caregivers';
const SENIOR_KEY = 'silvermatch_seniors';
const ACTIVE_USER_KEY = 'silvermatch_active_user';

// Initialize with some dummy data if empty to simulate a populated platform
const DUMMY_CAREGIVERS: CaregiverProfile[] = [
  {
    id: 'cg_1',
    fullName: 'Sarah Jenkins',
    contact: { email: 'sarah@example.com', phone: '555-0101', address: '123 Maple', city: 'Springfield', zip: '62704' },
    experienceYears: 8,
    bio: 'Certified nursing assistant with a passion for elderly care. I specialize in dementia care and creating engaging daily routines.',
    specialties: ['Dementia', 'Medication Management', 'Mobility Assistance'],
    hourlyRate: 25,
    platformRate: 27.5,
    availability: 'Weekdays, 9am - 5pm',
    isVerified: true
  },
  {
    id: 'cg_2',
    fullName: 'Robert Chen',
    contact: { email: 'rob@example.com', phone: '555-0102', address: '456 Oak', city: 'Springfield', zip: '62704' },
    experienceYears: 15,
    bio: 'Former paramedic turned private caregiver. Strong background in physical therapy exercises and emergency response.',
    specialties: ['Physical Therapy', 'Post-Surgery Recovery', 'Driving'],
    hourlyRate: 35,
    platformRate: 38.5,
    availability: 'Weekends, Evenings',
    isVerified: true
  },
  {
    id: 'cg_3',
    fullName: 'Emily Blunt',
    contact: { email: 'emily@example.com', phone: '555-0103', address: '789 Pine', city: 'Springfield', zip: '62704' },
    experienceYears: 3,
    bio: 'Cheerful and energetic companion. I love cooking, playing cards, and ensuring seniors feel heard and valued.',
    specialties: ['Companionship', 'Meal Prep', 'Light Housekeeping'],
    hourlyRate: 20,
    platformRate: 22,
    availability: 'Flexible',
    isVerified: false
  }
];

export const getCaregivers = (): CaregiverProfile[] => {
  const stored = localStorage.getItem(CAREGIVER_KEY);
  if (!stored) {
    localStorage.setItem(CAREGIVER_KEY, JSON.stringify(DUMMY_CAREGIVERS));
    return DUMMY_CAREGIVERS;
  }
  return JSON.parse(stored);
};

export const saveCaregiver = (profile: CaregiverProfile): void => {
  const current = getCaregivers();
  const updated = [...current, profile];
  localStorage.setItem(CAREGIVER_KEY, JSON.stringify(updated));
  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({ type: 'CAREGIVER', id: profile.id }));
};

export const getSeniors = (): SeniorProfile[] => {
  const stored = localStorage.getItem(SENIOR_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveSenior = (profile: SeniorProfile): void => {
  const current = getSeniors();
  const updated = [...current, profile];
  localStorage.setItem(SENIOR_KEY, JSON.stringify(updated));
  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({ type: 'FAMILY', id: profile.id }));
};

export const getActiveUser = (): { type: 'CAREGIVER' | 'FAMILY', id: string } | null => {
  const stored = localStorage.getItem(ACTIVE_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const getCurrentSeniorProfile = (id: string): SeniorProfile | undefined => {
  return getSeniors().find(s => s.id === id);
};

export const getCurrentCaregiverProfile = (id: string): CaregiverProfile | undefined => {
  return getCaregivers().find(c => c.id === id);
};

export const logout = () => {
  localStorage.removeItem(ACTIVE_USER_KEY);
};