import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://reecebforbes:YOUR_ACTUAL_PASSWORD@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if MongoDB URI is properly configured
    if (!process.env.MONGODB_URI && MONGODB_URI.includes('YOUR_ACTUAL_PASSWORD')) {
      console.error('MongoDB password not configured');
      return res.status(500).json({ 
        status: 'error',
        message: 'Database not configured',
        timestamp: new Date().toISOString()
      });
    }

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('waitlist');
    
    // Test connection with ping
    await db.command({ ping: 1 });

    await client.close();

    return res.status(200).json({ 
      status: 'ok',
      message: 'MongoDB connection successful',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('MongoDB status check error:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'MongoDB connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 