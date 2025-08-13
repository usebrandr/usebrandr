// openai-proxy.js
// Usage:
// 1. Run `npm install express axios dotenv cors`
// 2. Create a .env file in this folder with: OPENAI_API_KEY=sk-...
// 3. Start with: node openai-proxy.js
// 4. Frontend: POST to http://localhost:3001/api/openai

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// ===== Waitlist (MongoDB) Endpoint =====
let __mongoClient;
let __waitlistCollection;

async function getWaitlistCollection() {
  if (__waitlistCollection) return __waitlistCollection;
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'waitlist';
  if (!uri) throw new Error('MONGODB_URI not set');
  if (!__mongoClient) {
    __mongoClient = new MongoClient(uri, { maxPoolSize: 5 });
    await __mongoClient.connect();
  }
  const db = __mongoClient.db(dbName);
  __waitlistCollection = db.collection('signups');
  
  try {
    // Clean up corrupted data first
    console.log('Cleaning up corrupted data...');
    await __waitlistCollection.deleteMany({ email: null });
    await __waitlistCollection.deleteMany({ email: "" });
    
    // Drop existing problematic index if it exists
    try {
      await __waitlistCollection.dropIndex('email_1');
      console.log('Dropped old index');
    } catch (e) {
      console.log('No old index to drop');
    }
    
    // Create clean unique index
    await __waitlistCollection.createIndex({ email: 1 }, { unique: true });
    console.log('MongoDB index created successfully');
  } catch (error) {
    console.log('Index creation issue, continuing without unique constraint:', error.message);
  }
  
  return __waitlistCollection;
}

// Accept both /api/waitlist/join and with trailing slash
app.post(['/api/waitlist/join', '/api/waitlist/join/'], async (req, res) => {
  try {
    const { email, userType } = req.body || {};
    if (!email || typeof email !== 'string') return res.status(400).json({ error: 'Email required' });
    const type = userType === 'influencer' ? 'influencer' : 'business';
    const col = await getWaitlistCollection();
    
    const doc = {
      email: email.toLowerCase().trim(),
      userType: type,
      createdAt: new Date(),
      ua: req.headers['user-agent'] || null,
      ip: (req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '').toString()
    };
    try {
      await col.insertOne(doc);
      console.log(`New waitlist signup: ${email} (${type})`);
      return res.json({ 
        ok: true, 
        message: 'Successfully joined waitlist',
        email: email,
        userType: type
      });
    } catch (e) {
      if (e && e.code === 11000) return res.status(409).json({ error: 'Already on waitlist' });
      throw e;
    }
  } catch (err) {
    console.error('Waitlist error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'OpenAI proxy with waitlist is running' });
});

app.post('/api/openai', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`OpenAI proxy running on http://localhost:${PORT}`));