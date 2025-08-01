# Deploy to Vercel - Step by Step Guide

## 1. Create Vercel Account
- Go to https://vercel.com
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel to access your repositories

## 2. Deploy Project
- Click "New Project" in Vercel dashboard
- Import GitHub repository: `usebrandr/usebrandr`
- Vercel will auto-detect Node.js project
- Click "Deploy"

## 3. Configure Environment Variables
After deployment, go to Project Settings:
- Click your project in dashboard
- Go to "Settings" → "Environment Variables"
- Add variable:
  - **Name**: `MONGODB_URI`
  - **Value**: `mongodb+srv://reecebforbes:Banter8612!@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist`
  - **Environment**: Production, Preview, Development
- Click "Save"

## 4. Get API URL
- After deployment, Vercel will give you a URL like: `https://your-project.vercel.app`
- This is your API base URL

## 5. Update Frontend (After deployment)
Once you have the Vercel URL, we'll update the frontend to use it.

## Files Ready for Deployment
- ✅ `api/waitlist.js` - Waitlist API endpoint
- ✅ `api/status.js` - Status check endpoint
- ✅ `vercel.json` - Vercel configuration
- ✅ MongoDB password configured 