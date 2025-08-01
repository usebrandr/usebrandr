import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://reecebforbes:Banter8612!@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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