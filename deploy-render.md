# Deploy to Render - Step by Step Guide

## 1. Create Render Account
- Go to https://render.com
- Click "Get Started"
- Sign up with GitHub

## 2. Deploy Your API
1. **Click**: "New +" in Render dashboard
2. **Select**: "Web Service"
3. **Connect**: Your GitHub repository `usebrandr/usebrandr`
4. **Configure**:
   - **Name**: `brandr-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Health Check Path**: `/api/health`

## 3. Environment Variables
Add these in Render dashboard:
- **MONGODB_URI**: `mongodb+srv://reecebforbes:Banter8612!@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist`
- **NODE_ENV**: `production`

## 4. Deploy
- Click "Create Web Service"
- Render will automatically deploy your API
- You'll get a URL like: `https://brandr-api.onrender.com`

## 5. Update Frontend (After deployment)
Once you have the Render URL, we'll update the frontend to use it.

## Files Ready for Deployment
- ✅ `server.js` - Express server with MongoDB
- ✅ `render.yaml` - Render configuration
- ✅ MongoDB password configured
- ✅ Health check endpoint at `/api/health` 