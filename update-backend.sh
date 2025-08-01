#!/bin/bash

echo "🚀 Updating Brandr Backend for Render Deployment"

# Navigate to backend directory
cd backend

echo "📦 Installing dependencies..."
npm install

echo "🔧 Testing MongoDB connection..."
node -e "
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://reecebforbes:Banter8612!@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist';

async function testConnection() {
  try {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log('🔌 Testing MongoDB connection...');
    await client.connect();
    
    const db = client.db('waitlist');
    await db.command({ ping: 1 });
    
    console.log('✅ MongoDB connection successful!');
    await client.close();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
"

echo "🧪 Testing server startup..."
timeout 10s node server.js &
SERVER_PID=$!

sleep 3

if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Server is running and responding!"
    kill $SERVER_PID 2>/dev/null
else
    echo "❌ Server failed to start or respond"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo "🎉 Backend is ready for Render deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy to Render using the guide in deploy-render.md"
echo "2. Set MONGODB_URI environment variable in Render dashboard"
echo "3. Update frontend API URL after deployment"
echo "4. Test the connection using the health check endpoint" 