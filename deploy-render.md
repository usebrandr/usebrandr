# Render Deployment Guide for Brandr API

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **MongoDB Atlas**: Ensure your MongoDB Atlas cluster is running
3. **GitHub Repository**: Your code should be in a GitHub repository

## Step 1: Set Up Environment Variables in Render

1. Go to your Render dashboard
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `brandr-api`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

## Step 2: Configure Environment Variables

In your Render service settings, add these environment variables:

### Required Environment Variables:
```
MONGODB_URI=mongodb+srv://reecebforbes:YOUR_ACTUAL_PASSWORD@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist
NODE_ENV=production
```

### Important Notes:
- Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB Atlas password
- **Never commit passwords to Git** - use Render's environment variable feature
- The `render.yaml` file is configured to use `sync: false` for MONGODB_URI, meaning you must set it manually in Render

## Step 3: Update Frontend API URL

Once your Render service is deployed, update the API URL in your frontend:

1. Go to `src/components/WaitlistModal.tsx`
2. Update the fetch URL to your new Render service URL:

```typescript
const response = await fetch('https://YOUR_RENDER_SERVICE_URL.onrender.com/api/waitlist', {
  // ... rest of the code
});
```

## Step 4: Test the Connection

1. **Health Check**: Visit `https://YOUR_RENDER_SERVICE_URL.onrender.com/api/health`
2. **Status Check**: Visit `https://YOUR_RENDER_SERVICE_URL.onrender.com/api/status`
3. **Test Waitlist**: Try submitting a test email through your frontend

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check your MongoDB Atlas network access settings
   - Ensure your IP is whitelisted or use `0.0.0.0/0` for all IPs
   - Verify your connection string is correct

2. **CORS Errors**
   - The backend now includes CORS configuration for your domain
   - Make sure your frontend domain is in the allowed origins

3. **Build Failures**
   - Check that all dependencies are in `backend/package.json`
   - Ensure the `backend/server.js` file exists

4. **Service Not Starting**
   - Check Render logs for error messages
   - Verify the start command is correct
   - Ensure the port is set correctly (Render sets PORT automatically)

### MongoDB Atlas Configuration:

1. **Network Access**: 
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` to allow connections from anywhere
   - Or add Render's IP ranges if you prefer

2. **Database User**:
   - Ensure your database user has read/write permissions
   - Check that the username and password are correct

3. **Cluster Status**:
   - Make sure your MongoDB Atlas cluster is active
   - Check that you haven't exceeded your free tier limits

## Security Best Practices

1. **Environment Variables**: Never hardcode sensitive data
2. **CORS**: Only allow necessary origins
3. **Input Validation**: Always validate user input
4. **Error Handling**: Don't expose sensitive error details to clients

## Monitoring

- **Render Logs**: Monitor your service logs in Render dashboard
- **MongoDB Atlas**: Check your database usage and connections
- **Health Checks**: Set up monitoring for your API endpoints

## Deployment Checklist

- [ ] Environment variables configured in Render
- [ ] MongoDB Atlas network access configured
- [ ] Frontend API URL updated
- [ ] Health check endpoint responding
- [ ] Status endpoint showing MongoDB connection
- [ ] Waitlist form working correctly
- [ ] CORS errors resolved
- [ ] All dependencies installed

## Support

If you encounter issues:
1. Check Render service logs
2. Verify MongoDB Atlas configuration
3. Test API endpoints directly
4. Check CORS configuration
5. Verify environment variables are set correctly 