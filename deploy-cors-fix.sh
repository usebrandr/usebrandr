#!/bin/bash

echo "🚀 Deploying CORS Fix to Render..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please initialize git and push your changes."
    exit 1
fi

# Add all changes
echo "📝 Adding changes to git..."
git add .

# Commit the CORS fix
echo "💾 Committing CORS fix..."
git commit -m "Fix CORS configuration for production domain usebrandr.com"

# Push to trigger Render deployment
echo "🚀 Pushing to trigger Render deployment..."
git push

echo "✅ CORS fix deployed!"
echo ""
echo "📋 Next steps:"
echo "1. Wait 2-3 minutes for Render to deploy"
echo "2. Test the waitlist form on usebrandr.com"
echo "3. Check Render logs if issues persist"
echo ""
echo "🔍 To monitor deployment:"
echo "- Go to your Render dashboard"
echo "- Check the deployment logs"
echo "- Test the API endpoint: https://brand-api-sxnu.onrender.com/api/health" 