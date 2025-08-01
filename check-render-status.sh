#!/bin/bash

echo "🔍 Checking Render deployment status..."

# Test the health endpoint
echo "📡 Testing API health..."
HEALTH_RESPONSE=$(curl -s https://brand-api-sxnu.onrender.com/api/health)
echo "Health Response: $HEALTH_RESPONSE"

# Test the status endpoint
echo "📊 Testing MongoDB status..."
STATUS_RESPONSE=$(curl -s https://brand-api-sxnu.onrender.com/api/status)
echo "Status Response: $STATUS_RESPONSE"

# Test CORS preflight
echo "🌐 Testing CORS configuration..."
CORS_RESPONSE=$(curl -s -H "Origin: https://usebrandr.com" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: Content-Type" -X OPTIONS https://brand-api-sxnu.onrender.com/api/waitlist -I | grep -i "access-control-allow-origin")
echo "CORS Headers: $CORS_RESPONSE"

echo ""
echo "✅ Status check complete!"
echo "🎯 If all responses are successful, your waitlist form should now work!" 