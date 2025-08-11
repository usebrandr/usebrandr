// openai-proxy.js
// Usage:
// 1. Run `npm install express axios dotenv cors`
// 2. Create a .env file in this folder with: OPENAI_API_KEY=sk-...
// 3. Start with: node openai-proxy.js
// 4. Frontend: POST to http://localhost:3001/api/openai

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');
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
  await __waitlistCollection.createIndex({ emailHash: 1 }, { unique: true });
  return __waitlistCollection;
}

function sha256Lower(email) {
  return crypto.createHash('sha256').update(String(email).trim().toLowerCase(), 'utf8').digest('hex');
}

function getKey() {
  const raw = process.env.ENCRYPTION_KEY || '';
  if (!raw) throw new Error('ENCRYPTION_KEY not set');
  // Support base64 (default). If prefixed with hex:, treat as hex
  if (raw.startsWith('hex:')) return Buffer.from(raw.slice(4), 'hex');
  return Buffer.from(raw, 'base64');
}

function encrypt(value) {
  const key = getKey();
  if (key.length !== 32) throw new Error('ENCRYPTION_KEY must be 32 bytes (256-bit) in base64 or hex');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv: iv.toString('base64'), ct: ciphertext.toString('base64'), tag: tag.toString('base64'), alg: 'aes-256-gcm' };
}

// Accept both /api/waitlist/join and with trailing slash
app.post(['/api/waitlist/join', '/api/waitlist/join/'], async (req, res) => {
  try {
    const { email, userType } = req.body || {};
    if (!email || typeof email !== 'string') return res.status(400).json({ error: 'Email required' });
    const type = userType === 'influencer' ? 'influencer' : 'business';
    const col = await getWaitlistCollection();
    const emailHash = sha256Lower(email);
    const emailEnc = encrypt(email);
    const doc = {
      emailEnc,
      emailHash,
      userType: type,
      createdAt: new Date(),
      ua: req.headers['user-agent'] || null,
      ip: (req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '').toString()
    };
    try {
      await col.insertOne(doc);
      return res.json({ ok: true });
    } catch (e) {
      if (e && e.code === 11000) return res.status(409).json({ error: 'Already on waitlist' });
      throw e;
    }
  } catch (err) {
    console.error('Waitlist error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
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

app.listen(3001, () => console.log('OpenAI proxy running on http://localhost:3001')); 