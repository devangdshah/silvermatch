export enum UserRole {
  CAREGIVER = 'CAREGIVER',
  FAMILY = 'FAMILY',
  GUEST = 'GUEST'
}

export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export interface CaregiverProfile {
  id: string;
  fullName: string;
  contact: ContactDetails;
  experienceYears: number;
  bio: string;
  specialties: string[]; // e.g., Dementia, Mobility, Companionship
  hourlyRate: number; // The base rate the caregiver wants
  platformRate: number; // The rate shown to customers (base + 10%)
  availability: string; // e.g., "Weekdays", "Full-time"
  isVerified: boolean;
}

export interface SeniorProfile {
  id: string;
  contactName: string; // The family member registering
  contact: ContactDetails;
  seniorName: string;
  seniorAge: number;
  conditions: string[]; // e.g. Diabetes, Alzheimer's
  likes: string[]; // Hobbies, food
  dislikes: string[]; // Pet peeves
  careNeeds: string; // Description of daily routine needs
  budgetMax: number;
}

export interface MatchResult {
  caregiverId: string;
  score: number; // 0-100
  reasoning: string;
  tags: string[];
}

export const PLATFORM_COMMISSION_PERCENT = 0.10;