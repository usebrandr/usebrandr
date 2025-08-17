import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs'; // Added for file system operations

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

// Serve static assets from the dist directory FIRST - this is critical
app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for JS
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for CSS
    } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.gif') || filePath.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/' + filePath.split('.').pop());
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for images
    }
  }
}));

// Add error handling for asset requests
app.use('/assets', (req, res, next) => {
  const assetPath = path.join(__dirname, 'dist', 'assets', req.path.replace('/assets/', ''));
  if (!fs.existsSync(assetPath)) {
    console.error(`❌ Asset not found: ${req.path} -> ${assetPath}`);
    return res.status(404).json({ error: 'Asset not found', path: req.path });
  }
  next();
});

// Serve other static files from project root (excluding index.html and assets)
app.use(express.static(__dirname, {
  index: false, // Don't serve index.html automatically
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (filePath.endsWith('.gif')) {
      res.setHeader('Content-Type', 'image/gif');
    } else if (filePath.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    } else if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    } else if (filePath.endsWith('.mov')) {
      res.setHeader('Content-Type', 'video/quicktime');
    }
  }
}));

// Debug middleware to log static file requests
app.use((req, res, next) => {
  if (req.path.startsWith('/assets/')) {
    console.log(`📁 Static file request: ${req.path}`);
  }
  next();
});

// Remove custom asset route - let Express handle it with proper MIME types

  // Serve index.html for the root route
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// This will be moved to the end after all API routes

// MongoDB connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;

// Create a MongoDB client instance
let mongoClient = null;
let isMongoConnected = false;
// Test MongoDB connection function
const testMongoConnection = async () => {
  try {
    if (MONGODB_URI) {
      const client = await connectToMongoDB();
      await client.db('waitlist').command({ ping: 1 });
      isMongoConnected = true;
      console.log('✅ MongoDB connection test successful');
    } else {
      console.log('⚠️  MongoDB URI not configured');
    }
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error);
    isMongoConnected = false;
  }
};

const connectToMongoDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    if (!mongoClient) {
      console.log('Attempting to connect to MongoDB...');
      mongoClient = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 45000,
      });
      await mongoClient.connect();
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB successfully');
    }
    return mongoClient;
  } catch (error) {
    isMongoConnected = false;
    console.error('❌ MongoDB connection error:', error.message);
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

    try {
      // Try to connect to MongoDB
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
    } catch (mongoError) {
      console.log('MongoDB not available, using fallback storage');
      
      // Fallback: just log the signup and return success
      console.log(`Fallback waitlist signup: ${email} (${userType})`);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully joined waitlist (offline mode)',
        id: 'fallback-' + Date.now(),
        note: 'Data stored locally - MongoDB connection not available'
      });
    }

  } catch (error) {
    console.error('Waitlist API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Add the missing /api/waitlist/join route that the frontend expects
app.post('/api/waitlist/join', async (req, res) => {
  try {
    const { email, userType } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    try {
      // Try to connect to MongoDB
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
    } catch (mongoError) {
      console.log('MongoDB not available, using fallback storage');
      
      // Fallback: just log the signup and return success
      console.log(`Fallback waitlist signup: ${email} (${userType})`);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully joined waitlist (offline mode)',
        id: 'fallback-' + Date.now(),
        note: 'Data stored locally - MongoDB connection not available'
      });
    }

  } catch (error) {
    console.error('Waitlist join API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/status', async (req, res) => {
  try {
    if (!MONGODB_URI) {
      return res.status(200).json({ 
        status: 'offline',
        message: 'MongoDB URI not configured',
        timestamp: new Date().toISOString(),
        note: 'Set MONGODB_URI environment variable to enable database storage'
      });
    }

    if (!isMongoConnected) {
      return res.status(200).json({ 
        status: 'offline',
        message: 'MongoDB connection failed',
        timestamp: new Date().toISOString(),
        note: 'Check your MongoDB connection string and network access'
      });
    }

    // Test connection with ping
    const client = await connectToMongoDB();
    const db = client.db('waitlist');
    await db.command({ ping: 1 });

    return res.status(200).json({ 
      status: 'connected',
      message: 'MongoDB connection successful',
      timestamp: new Date().toISOString(),
      database: 'waitlist'
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

// Specific route for the root of external brand API
app.get('/api/brand', async (req, res) => {
  try {
    console.log('Proxying root request to external brand API');
    const response = await fetch('https://brand-api-sxnu.onrender.com/');
    
    // Check content type to determine how to handle response
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      // For HTML or other content types, send as text
      const data = await response.text();
      res.status(response.status).type(contentType || 'text/html').send(data);
    }
  } catch (error) {
    console.error('Root proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request to external API' });
  }
});

// Proxy route to external brand API (place this AFTER your existing API routes)
app.use('/api/brand', async (req, res) => {
  try {
    const externalApiUrl = 'https://brand-api-sxnu.onrender.com';
    const targetPath = req.path.replace('/api/brand', '');
    const targetUrl = `${externalApiUrl}${targetPath}`;
    
    console.log(`Proxying request: ${req.method} ${targetUrl}`);
    
    // Forward the request to the external API
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
        'host': new URL(externalApiUrl).host,
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    
    // Check content type to determine how to handle response
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      // For HTML or other content types, send as text
      const data = await response.text();
      res.status(response.status).type(contentType || 'text/html').send(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request to external API' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Handle React Router routes - serve index.html for all non-API, non-asset routes
app.get('*', (req, res) => {
  // Don't serve index.html for asset requests or API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Route not found' });
  }
  
  // Serve index.html for all other routes (React Router)
  console.log(`📄 Serving index.html for route: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

app.listen(PORT, async () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  
  try {
    // Test MongoDB connection on startup
    await testMongoConnection();
    
    if (isMongoConnected) {
      console.log(`✅ MongoDB: Connected successfully`);
    } else {
      console.log(`⚠️  MongoDB: Running in offline mode`);
    }
  } catch (error) {
    console.error('❌ Server startup error:', error);
    console.log(`⚠️  Server running without MongoDB connection`);
  }
}); 