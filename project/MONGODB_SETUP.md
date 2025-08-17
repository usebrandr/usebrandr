# MongoDB Setup Guide for Brandr

## Why "Offline Mode" Appears

Your waitlist endpoint shows "offline mode" because:
1. **MongoDB URI not configured** - The `MONGODB_URI` environment variable is not set
2. **No database connection** - The server can't connect to a MongoDB database
3. **Fallback behavior** - Emails are logged locally instead of stored in the database

## Step-by-Step MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Sign up for a free account
- Create a new project called "Brandr"

### 2. Create Free Cluster
- Click "Build a Database"
- Choose **FREE** tier (M0 Sandbox)
- Select cloud provider (AWS/Google Cloud/Azure)
- Choose region close to your users
- Click "Create"

### 3. Set Up Database Access
- Go to "Database Access" in left sidebar
- Click "Add New Database User"
- Choose "Password" authentication
- Username: `brandr_user`
- Password: Create a strong password (save this!)
- Privileges: "Read and write to any database"
- Click "Add User"

### 4. Set Up Network Access
- Go to "Network Access" in left sidebar
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (for now)
- Click "Confirm"

### 5. Get Connection String
- Go back to "Database" in left sidebar
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string

### 6. Update Connection String
Replace the placeholder values in your connection string:
```
mongodb+srv://brandr_user:YOUR_PASSWORD@cluster0.mongodb.net/waitlist?retryWrites=true&w=majority
```

**Important**: Replace `YOUR_PASSWORD` with the actual password you created in step 3.

## Configuration

### For Local Development
Create a `.env` file in your project directory:
```bash
MONGODB_URI=mongodb+srv://brandr_user:YOUR_PASSWORD@cluster0.mongodb.net/waitlist?retryWrites=true&w=majority
NODE_ENV=development
PORT=3001
```

### For Render Deployment
1. Go to your Render dashboard
2. Select your `usebrandr` service
3. Go to "Environment" tab
4. Add environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string

## Testing the Connection

### 1. Test Locally
```bash
# Start the server
node server.js

# Check MongoDB status
curl http://localhost:3001/api/status

# Test waitlist endpoint
curl -X POST http://localhost:3001/api/waitlist/join \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","userType":"business"}'
```

### 2. Expected Results
**With MongoDB connected:**
```json
{
  "status": "connected",
  "message": "MongoDB connection successful",
  "database": "waitlist"
}
```

**Without MongoDB:**
```json
{
  "status": "offline",
  "message": "MongoDB URI not configured",
  "note": "Set MONGODB_URI environment variable to enable database storage"
}
```

## Troubleshooting

### Common Issues

1. **"MongoDB URI not configured"**
   - Set the `MONGODB_URI` environment variable
   - Check that the variable name is exactly `MONGODB_URI`

2. **"MongoDB connection failed"**
   - Verify your password is correct
   - Check that your IP is allowed in Network Access
   - Ensure the cluster is running

3. **"Authentication failed"**
   - Double-check username and password
   - Make sure the user has the correct permissions

### Security Notes

- **Never commit passwords to git**
- **Use environment variables for sensitive data**
- **Restrict IP access in production**
- **Use strong, unique passwords**

## Next Steps

1. **Set up MongoDB Atlas** following the steps above
2. **Configure environment variables** locally and on Render
3. **Test the connection** using the endpoints above
4. **Deploy to Render** - the build process will now work correctly
5. **Verify waitlist functionality** - emails should now be stored in MongoDB

## Benefits of MongoDB Connection

✅ **Persistent data storage** - Waitlist emails are saved permanently
✅ **No more "offline mode"** - Real database functionality
✅ **Data analytics** - Track signups over time
✅ **Scalability** - Handle thousands of waitlist signups
✅ **Professional setup** - Production-ready infrastructure

Once configured, your waitlist will work properly and store all signups in the MongoDB database!
