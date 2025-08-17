# Deployment Guide for UseBrandr

## Overview
This guide helps prevent the common "Uncaught SyntaxError: Unexpected token '<'" error that occurs when deploying React apps to Render.

## Common Causes
The "Unexpected token '<'" error typically occurs when:
1. JavaScript files are served with incorrect MIME types
2. The server serves `index.html` instead of JavaScript assets
3. Asset paths are incorrect in the build output
4. Static file serving is not configured properly

## Pre-Deployment Checklist

### 1. Verify Local Build
```bash
npm run build
npm run debug
```

### 2. Check Build Output
Ensure your `dist/` folder contains:
- `index.html`
- `assets/` folder with:
  - JavaScript files (`.js`)
  - CSS files (`.css`)
  - Image files (`.png`, `.jpg`, etc.)

### 3. Test Local Server
```bash
npm run server
# Test asset serving
curl -I http://localhost:3001/assets/index-[hash].js
# Should return: Content-Type: application/javascript
```

## Deployment Configuration

### Render.yaml
The `render.yaml` file is configured to:
- Build the React app with `npm run build`
- Start the Node.js server with `node server.js`
- Serve static assets from the `dist/` folder

### Server Configuration
The Express server is configured to:
1. Serve static assets from `/assets` with correct MIME types
2. Handle React Router routes by serving `index.html`
3. Provide proper error handling for missing assets

## Troubleshooting

### If you still get "Unexpected token '<'":

1. **Check Render build logs**
   - Look for any build errors
   - Verify the `dist/` folder structure

2. **Verify asset paths**
   - Check that JavaScript files are being served from `/assets/`
   - Ensure `Content-Type: application/javascript` headers

3. **Check network tab**
   - Look for failed JavaScript requests
   - Verify the response contains JavaScript, not HTML

4. **Test asset serving**
   - Try accessing a JavaScript file directly: `https://your-app.onrender.com/assets/index-[hash].js`
   - Should return JavaScript code, not HTML

### Common Fixes

1. **Clear browser cache** - Old cached files might cause issues
2. **Check CORS settings** - Ensure your domain is allowed
3. **Verify environment variables** - Check Render dashboard for missing vars

## File Structure
```
project/
├── dist/                    # Build output (generated)
│   ├── index.html
│   └── assets/
│       ├── index-[hash].js
│       ├── vendor-[hash].js
│       └── index-[hash].css
├── src/                     # Source code
├── server.js               # Express server
├── vite.config.ts          # Vite configuration
└── package.json
```

## Commands Reference

```bash
# Development
npm run dev          # Start Vite dev server
npm run server:dev   # Start Express server with watch

# Production
npm run build        # Build React app
npm run debug        # Verify build output
npm run server       # Start production server
npm start:prod      # Start production server (alias)
```

## Support
If you continue to experience issues:
1. Check Render build logs for errors
2. Verify the build output locally
3. Test asset serving locally before deploying
4. Check the browser's network tab for failed requests
