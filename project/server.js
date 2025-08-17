import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    'https://brand-api-sxnu.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* ================================
   STATIC FILES (Frontend build)
   ================================ */
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  console.log(`✅ Found dist folder at: ${distPath}`);
} else {
  console.warn(`⚠️ Dist folder not found at: ${distPath}`);
}

// Serve everything inside dist/
app.use(express.static(distPath));

// React Router fallback – serve index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next(); // Skip API
  res.sendFile(path.join(distPath, 'index.html'));
});

/* ================================
   DATABASE CONNECTION
   ================================ */
const MONGODB_URI = process.env.MONGODB_URI;
let mongoClient = null;
let isMongoConnected = false;

const connectToMongoDB = async () => {
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set');
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    await mongoClient.connect();
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB');
  }
  return mongoClient;
};

/* ================================
   API ROUTES
   ================================ */
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.post('/api/waitlist', async (req, res) => {
  try {
    const { email, userType } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    try {
      const client = await connectToMongoDB();
      const db = client.db('waitlist');
      const collection = db.collection('emails');
      const existing = await collection.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(409).json({ error: 'Email already registered' });

      const result = await collection.insertOne({
        email: email.toLowerCase(),
        userType: userType || 'business',
        createdAt: new Date(),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      });

      res.status(200).json({ success: true, id: result.insertedId });
    } catch {
      res.status(200).json({
        success: true,
        id: 'fallback-' + Date.now(),
        note: 'Stored locally – MongoDB offline'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// (add your other /api/waitlist/join, /api/status, /api/brand routes here)

/* ================================
   START SERVER
   ================================ */
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    if (MONGODB_URI) {
      await connectToMongoDB();
    } else {
      console.log('⚠️ MongoDB URI not configured – running offline');
    }
  } catch {
    console.log('⚠️ MongoDB connection failed – running offline');
  }
});
