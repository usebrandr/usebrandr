import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://reecebforbes:YOUR_ACTUAL_PASSWORD@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, userType } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Check if MongoDB URI is properly configured
    if (!process.env.MONGODB_URI && MONGODB_URI.includes('YOUR_ACTUAL_PASSWORD')) {
      console.error('MongoDB password not configured');
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('waitlist');
    const collection = db.collection('emails');

    // Check if email already exists
    const existingEmail = await collection.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      await client.close();
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Insert new email
    const result = await collection.insertOne({
      email: email.toLowerCase(),
      userType: userType || 'business',
      createdAt: new Date(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    await client.close();

    console.log(`New waitlist signup: ${email} (${userType})`);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully joined waitlist',
      id: result.insertedId 
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 