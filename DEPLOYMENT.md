# Deployment Guide: SilverMatch to Vercel via GitHub

This guide will walk you through deploying your SilverMatch application to Vercel using GitHub.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- Your Google Gemini API key

## Step-by-Step Instructions

### Step 1: Create Initial Git Commit

```bash
git add .
git commit -m "Initial commit: SilverMatch application"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `silvermatch` (or your preferred name)
3. Description: "AI-Powered Senior Care Matching Platform"
4. Choose **Private** or **Public** (your preference)
5. **DO NOT** check "Add a README file" (we already have one)
6. Click **"Create repository"**

### Step 3: Push Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Replace <your-username> with your GitHub username
git remote add origin https://github.com/<your-username>/silvermatch.git
git branch -M main
git push -u origin main
```

If prompted, enter your GitHub username and password (or use a personal access token).

### Step 4: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account (recommended for easier setup)
3. **Click "Add New Project"** button
4. **Import your repository**:
   - Select your GitHub account
   - Find and click on `silvermatch` repository
   - Click "Import"

5. **Configure Project Settings**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

6. **Add Environment Variable**:
   - Scroll down to "Environment Variables" section
   - Click "Add"
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key (get it from https://aistudio.google.com/app/apikey)
   - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

7. **Deploy**:
   - Click "Deploy" button
   - Wait 1-2 minutes for build to complete
   - Your app will be live! 🎉

### Step 5: Access Your Deployed App

After deployment:
- Vercel will provide you with a URL like: `https://silvermatch-xyz123.vercel.app`
- You can also add a custom domain in Vercel project settings

## Updating Your Deployment

Any time you push changes to GitHub:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically detect the changes and redeploy your application! ✨

## Troubleshooting

### Build Fails

- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18 by default)

### Environment Variable Issues

- Make sure the variable name is exactly `VITE_GEMINI_API_KEY`
- Ensure it's added to all environments (Production, Preview, Development)
- Redeploy after adding/changing environment variables

### Routing Issues

- The app uses HashRouter, which works well with Vercel
- The `vercel.json` configuration handles routing for SPA

## Security Notes

- ✅ `.env.local` is in `.gitignore` and won't be committed
- ✅ API key is stored securely in Vercel environment variables
- ⚠️ Remember: The API key is still exposed in the client-side code (this is expected for this demo app)

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

