import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://usebrandr.com', 
    'https://www.usebrandr.com',
    'http://usebrandr.com',
    'http://www.usebrandr.com',
    'http://localhost:5173', 
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://reecebforbes:Banter8612!@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist';

// Create a MongoDB client instance
let mongoClient = null;

const connectToMongoDB = async () => {
  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      await mongoClient.connect();
      console.log('Connected to MongoDB successfully');
    }
    return mongoClient;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// API Routes
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email, userType } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Connect to MongoDB
    const client = await connectToMongoDB();
    const db = client.db('waitlist');
    const collection = db.collection('emails');

    // Check if email already exists
    const existingEmail = await collection.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Insert new email
    const result = await collection.insertOne({
      email: email.toLowerCase(),
      userType: userType || 'business',
      createdAt: new Date(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

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
});

app.get('/api/status', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await connectToMongoDB();
    const db = client.db('waitlist');
    
    // Test connection with ping
    await db.command({ ping: 1 });

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
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
}); 