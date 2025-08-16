import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

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

// Debug: Log the current working directory and check if dist exists
console.log('Current working directory:', process.cwd());
console.log('Dist directory path:', path.join(process.cwd(), 'dist'));
console.log('Dist directory exists:', existsSync(path.join(process.cwd(), 'dist')));

// Global variable for dist path - will be set in startServer function
let distPath = null;

// Set up static file serving for both dist folder and root assets
app.use(express.static(path.join(process.cwd(), 'dist')));
app.use(express.static(process.cwd())); // Serve files from root directory (for videos, images, etc.)

// Serve index.html for the root route
app.get('/', (req, res) => {
  if (!distPath) {
    console.log('❌ distPath not yet set, sending fallback response');
    res.status(503).send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Brandr - Starting Up</title>
      </head>
      <body>
          <h1>Brandr App</h1>
          <p>Server is starting up. Please wait...</p>
          <p>Current directory: ${process.cwd()}</p>
      </body>
      </html>
    `);
    return;
  }
  
  const indexPath = path.join(distPath, 'index.html');
  console.log('Attempting to serve index.html from:', indexPath);
  
  if (existsSync(indexPath)) {
    console.log('✅ index.html found, serving file');
    res.sendFile(indexPath);
  } else {
    console.log('❌ index.html not found, sending fallback response');
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Brandr - Build in Progress</title>
      </head>
      <body>
          <h1>Brandr App</h1>
          <p>Build is in progress. Please wait...</p>
          <p>Current directory: ${process.cwd()}</p>
          <p>Expected dist path: ${distPath}</p>
        </body>
      </html>
    `);
  }
});

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Note: Catch-all route for React Router moved to end of file

// MongoDB connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;

// Start server function
const startServer = async () => {
  try {
    // More comprehensive debugging
    console.log('=== DETAILED DIRECTORY INSPECTION ===');
    console.log('Listing current directory contents:');
    try {
      const fs = await import('fs/promises');
      const files = await fs.readdir(process.cwd());
      console.log('Files in current directory:', files);
      
      if (files.includes('dist')) {
        console.log('✅ dist folder found in current directory');
        const distFiles = await fs.readdir(path.join(process.cwd(), 'dist'));
        console.log('Files in dist folder:', distFiles);
        
        if (distFiles.includes('index.html')) {
          console.log('✅ index.html found in dist folder');
          const stats = await fs.stat(path.join(process.cwd(), 'dist', 'index.html'));
          console.log('index.html file size:', stats.size, 'bytes');
        } else {
          console.log('❌ index.html NOT found in dist folder');
        }
      } else {
        console.log('❌ dist folder NOT found in current directory');
        
        // Search for dist folders in parent directories
        console.log('Searching for dist folders in parent directories...');
        let currentDir = process.cwd();
        for (let i = 0; i < 3; i++) {
          const parentDir = path.dirname(currentDir);
          if (parentDir === currentDir) break;
          currentDir = parentDir;
          try {
            const parentFiles = await fs.readdir(currentDir);
            if (parentFiles.includes('dist')) {
              console.log(`✅ dist folder found in parent directory: ${currentDir}`);
              const distFiles = await fs.readdir(path.join(currentDir, 'dist'));
              console.log('Files in parent dist folder:', distFiles);
              break;
            }
          } catch (err) {
            console.log(`Could not read directory: ${currentDir}`);
          }
        }
        
        // If still no dist found, try to create a minimal index.html
        console.log('Attempting to create a minimal index.html for testing...');
        try {
          await fs.mkdir('dist', { recursive: true });
          const minimalHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Brandr - Loading...</title>
</head>
<body>
    <h1>Brandr App</h1>
    <p>Build in progress...</p>
</body>
</html>`;
          await fs.writeFile('dist/index.html', minimalHtml);
          console.log('✅ Created minimal index.html for testing');
        } catch (createError) {
          console.error('Failed to create minimal index.html:', createError);
        }
      }
    } catch (error) {
      console.error('Error during directory inspection:', error);
    }
    console.log('=== END DIRECTORY INSPECTION ===');

    // Set up static file serving after checking dist folder
    distPath = path.join(process.cwd(), 'dist');
    console.log('Setting up static file serving from:', distPath);
    
    if (existsSync(distPath)) {
      console.log('✅ dist directory exists, static file serving is ready');
    } else {
      console.log('❌ dist directory does not exist, static file serving may fail');
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Server started successfully!`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

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

// Add the missing /api/waitlist/join route that the frontend expects
app.post('/api/waitlist/join', async (req, res) => {
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
    console.error('Waitlist join API error:', error);
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

// Handle React Router routes - serve index.html for frontend routes only
// This must be placed AFTER all API routes to avoid intercepting them
app.get('*', (req, res) => {
  // Skip API routes - let them be handled by their specific handlers
  if (req.path.startsWith('/api/') || req.path === '/health') {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  if (!distPath) {
    console.log(`❌ distPath not yet set for route: ${req.path}`);
    res.status(503).send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Brandr - Starting Up</title>
      </head>
      <body>
          <h1>Brandr App</h1>
          <p>Server is starting up. Please wait...</p>
          <p>Route requested: ${req.path}</p>
          <p>Current directory: ${process.cwd()}</p>
        </body>
      </html>
    `);
    return;
  }
  
  const indexPath = path.join(distPath, 'index.html');
  console.log(`Frontend route ${req.path} - serving index.html from:`, indexPath);
  
  if (existsSync(indexPath)) {
    console.log('✅ index.html found, serving for frontend route:', req.path);
    res.sendFile(indexPath);
  } else {
    console.log('❌ index.html not found for frontend route:', req.path);
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Brandr - Build in Progress</title>
      </head>
      <body>
          <h1>Brandr App</h1>
          <p>Build is in progress. Please wait...</p>
          <p>Route requested: ${req.path}</p>
          <p>Expected dist path: ${distPath}</p>
        </body>
      </html>
    `);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

// Start the server
startServer(); 