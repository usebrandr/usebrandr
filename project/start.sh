#!/bin/bash

# Brandr Platform Startup Script
# This script starts both the Django backend and React frontend

echo "🚀 Starting Brandr Platform..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Check if we're in the right directory
if [ ! -f "backend/manage.py" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Error: Virtual environment not found. Please run setup first."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo "❌ Error: Frontend dependencies not installed. Please run 'cd frontend && npm install' first."
    exit 1
fi

echo "📦 Starting Django Backend..."
cd backend
source ../venv/bin/activate
python manage.py runserver 8000 &
BACKEND_PID=$!
cd ..

echo "🎨 Starting React Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Services started successfully!"
echo ""
echo "🌐 Frontend: http://localhost:5173 (or next available port)"
echo "🔧 Backend:  http://localhost:8000"
echo "📊 Admin:    http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID


