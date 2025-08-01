#!/bin/bash

if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Render URL"
    echo "Usage: ./update-frontend.sh <YOUR_RENDER_URL>"
    echo "Example: ./update-frontend.sh https://brandr-api.onrender.com"
    exit 1
fi

RENDER_URL=$1

echo "🔧 Updating frontend to use Render API: $RENDER_URL"
echo ""

# Update the API call in WaitlistModal.tsx
sed -i '' "s|fetch('/api/waitlist'|fetch('$RENDER_URL/api/waitlist'|g" src/components/WaitlistModal.tsx

echo "✅ Updated WaitlistModal.tsx to use Render API"
echo ""

# Build and deploy
echo "🚀 Building and deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your website is now live with the Render API"
echo "🔗 Frontend: https://usebrandr.com"
echo "🔗 API: $RENDER_URL"
echo ""
echo "Test the waitlist functionality on your live website!" 