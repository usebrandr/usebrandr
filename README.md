# Brandr - AI-Powered Influencer Marketing Platform

A modern, AI-powered influencer marketing platform built with React, TypeScript, and MongoDB.

## Features

- **Landing Page**: Modern, responsive design with waitlist signup
- **Contact Form**: Dedicated contact page with form submission
- **Waitlist Management**: Email collection and user type tracking
- **Backend API**: Express.js server with MongoDB integration
- **Waitlist Management**: Email collection and storage in MongoDB

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**: GitHub Pages, Custom Domain (usebrandr.com)

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the project root with your MongoDB connection string:

```bash
MONGODB_URI=mongodb+srv://reecebforbes:YOUR_ACTUAL_PASSWORD@waitlist.zwsho5.mongodb.net/?retryWrites=true&w=majority&appName=Waitlist
```

**Important**: Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB Atlas password.

### 2. Install Dependencies

```bash
npm install
```

### 3. Development

#### Frontend Only (Vite Dev Server)
```bash
npm run dev
```

#### Full Stack (Frontend + Backend)
```bash
npm run dev:full
```

#### Backend Only
```bash
npm run server
```

### 4. Build and Deploy

```bash
# Build the frontend
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## API Endpoints

### POST /api/waitlist
Accepts waitlist signup requests with email and user type.

**Request Body:**
```json
{
  "email": "user@example.com",
  "userType": "business" // or "influencer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined waitlist",
  "id": "mongodb_document_id"
}
```

### GET /api/status
Checks MongoDB connection status.

**Response:**
```json
{
  "status": "ok", // or "error"
  "message": "MongoDB connection successful",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Database Schema

### Collection: `emails` (Database: `waitlist`)

```javascript
{
  _id: ObjectId,
  email: String, // lowercase, unique
  userType: String, // "business" or "influencer"
  createdAt: Date,
  ip: String // IP address of signup
}
```

## Security Features

- Environment variables for sensitive data
- Email validation and deduplication
- IP address logging for security
- CORS protection
- Input sanitization

## File Structure

```
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx      # Main landing page
│   │   ├── ContactPage.tsx      # Contact form page
│   │   ├── WaitlistModal.tsx   # Waitlist signup modal
│   │   ├── WaitlistModal.tsx    # Waitlist signup modal
│   │   └── ...
│   └── ...
├── api/
│   ├── waitlist.js             # Waitlist API endpoint
│   └── status.js               # Status check endpoint
├── server.js                   # Express server
├── .env                        # Environment variables
└── package.json
```

## Deployment

The application is deployed to GitHub Pages at `https://usebrandr.com` with a custom domain.

### Backend Deployment

For production backend deployment, consider:
- Vercel (serverless functions)
- Railway
- Heroku
- DigitalOcean App Platform

## Waitlist Management

The waitlist system collects emails and user types for future platform access:
- Email collection and storage
- User type tracking (business/influencer)
- Quick actions for monitoring

## Support

For technical support or questions, contact: hello@usebrandr.com 