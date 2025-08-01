# Deploy to Vercel - Simple Guide

## Why Vercel is Better:
- ✅ Handles mixed frontend/backend projects
- ✅ No TypeScript build issues
- ✅ Automatic deployment from GitHub
- ✅ Free tier available

## Steps:

### 1. Go to Vercel
- Visit: https://vercel.com
- Sign up/login with GitHub

### 2. Import Project
- Click "New Project"
- Import: `usebrandr/usebrandr`
- Vercel will auto-detect it's a Node.js project

### 3. Configure
- **Framework Preset**: Node.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: Leave empty (not needed)
- **Output Directory**: Leave empty (not needed)
- **Install Command**: Leave empty (not needed)

### 4. Environment Variables
Add this environment variable:
- **Name**: `MONGODB_URI`
- **Value**: `mongodb+srv://reecebforbes:Banter8612!@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist`

### 5. Deploy
- Click "Deploy"
- Wait 2-3 minutes

### 6. Get Your URL
You'll get a URL like: `https://your-project.vercel.app`

### 7. Update Frontend
Run: `./update-frontend.sh https://your-project.vercel.app`

## Files Ready:
- ✅ `server.js` - Express server
- ✅ `vercel.json` - Vercel configuration
- ✅ MongoDB password configured 