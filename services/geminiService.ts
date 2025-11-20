import { GoogleGenerativeAI } from "@google/generative-ai";
import { CaregiverProfile, SeniorProfile, MatchResult } from "../types";

const getAI = () => {
    // NOTE: In a real production app, this key would be proxied through a backend
    // to prevent exposure. For this demo, we use the env variable directly.
    return new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
};

export const findMatches = async (
  senior: SeniorProfile,
  caregivers: CaregiverProfile[],
  language: 'en' | 'gu' = 'en'
): Promise<MatchResult[]> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.warn("No API Key provided, returning unranked list");
    return caregivers.map(c => ({
        caregiverId: c.id,
        score: 50,
        reasoning: language === 'gu' 
          ? "ડેમો મોડ: બુદ્ધિશાળી મેચિંગ માટે API કી ઉમેરો." 
          : "Demo mode: Add API Key for intelligent matching.",
        tags: ["Available"]
    }));
  }

  const ai = getAI();
  
  const langInstruction = language === 'gu' 
    ? "CRITICAL: You MUST output the 'reasoning' text and 'tags' entirely in Gujarati language (Gujarati script)." 
    : "Output 'reasoning' and 'tags' in English.";

  const prompt = `
    Act as a senior care matching specialist.
    
    I have a Senior Profile:
    ${JSON.stringify(senior, null, 2)}

    And a list of Caregiver Candidates:
    ${JSON.stringify(caregivers.map(c => ({
        id: c.id,
        name: c.fullName,
        bio: c.bio,
        specialties: c.specialties,
        experience: c.experienceYears,
        rate: c.platformRate
    })), null, 2)}

    Task:
    1. Analyze the senior's needs (medical conditions, likes/dislikes, budget).
    2. Compare against each caregiver's skills, bio, and rate.
    3. Return a JSON array ranking the caregivers based on compatibility.
    4. For each caregiver, provide:
       - caregiverId: string (the caregiver's id)
       - score: number (0-100 compatibility score)
       - reasoning: string (explanation in ${language === 'gu' ? 'Gujarati' : 'English'})
       - tags: array of 3 strings (e.g., ["Budget Friendly", "Medical Expert", "Companionship"])

    ${langInstruction}
    
    IMPORTANT: Return ONLY valid JSON array format like this:
    [
      {
        "caregiverId": "cg_1",
        "score": 85,
        "reasoning": "...",
        "tags": ["tag1", "tag2", "tag3"]
      },
      ...
    ]
  `;

  try {
    const model = ai.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const response = await model.generateContent(prompt);
    const text = response.response.text();
    if (!text) return [];
    
    const matches = JSON.parse(text) as MatchResult[];
    // Sort high to low just in case the model didn't perfectly order them
    return matches.sort((a, b) => b.score - a.score);

  } catch (error) {
    console.error("Error generating matches:", error);
    return [];
  }
};