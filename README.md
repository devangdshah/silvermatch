<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SilverMatch - AI-Powered Senior Care Matching Platform

SilverMatch connects families seeking care for seniors with experienced caregivers using AI-powered matching technology.

## Features

- 🤖 **AI-Powered Matching**: Uses Google Gemini AI to intelligently match caregivers with seniors based on medical needs, preferences, and budget
- 🌍 **Multilingual Support**: Available in English and Gujarati (ગુજરાતી)
- 👨‍⚕️ **Dual User Roles**: Separate registration flows for families and caregivers
- 💰 **Transparent Pricing**: 10% platform commission clearly displayed

## Run Locally

**Prerequisites:** Node.js 16+ and npm

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` file and set your Google Gemini API key:
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   Get your API key from: https://aistudio.google.com/app/apikey

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Initialize Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository:**
   - Go to https://github.com/new
   - Create a new repository (don't initialize with README)
   - Copy the repository URL

3. **Push to GitHub:**
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - Key: `VITE_GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Add `VITE_GEMINI_API_KEY` with your API key

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
silvermatch/
├── components/       # Reusable React components
├── contexts/         # React context providers (Language)
├── pages/           # Page components
├── services/        # API and storage services
├── types.ts         # TypeScript type definitions
├── translations.ts  # Multilingual translations
└── App.tsx          # Main application component
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router (HashRouter)
- **AI**: Google Generative AI (Gemini)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## License

Private project
