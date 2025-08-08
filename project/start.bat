@echo off
REM Brandr Platform Startup Script for Windows
REM This script starts both the Django backend and React frontend

echo 🚀 Starting Brandr Platform...

REM Check if we're in the right directory
if not exist "backend\manage.py" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "venv" (
    echo ❌ Error: Virtual environment not found. Please run setup first.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "frontend\node_modules" (
    echo ❌ Error: Frontend dependencies not installed. Please run 'cd frontend && npm install' first.
    pause
    exit /b 1
)

echo 📦 Starting Django Backend...
cd backend
call ..\venv\Scripts\activate.bat
start "Django Backend" cmd /k "python manage.py runserver 8000"
cd ..

echo 🎨 Starting React Frontend...
cd frontend
start "React Frontend" cmd /k "npm run dev"
cd ..

echo ✅ Services started successfully!
echo.
echo 🌐 Frontend: http://localhost:5173 (or next available port)
echo 🔧 Backend:  http://localhost:8000
echo 📊 Admin:    http://localhost:8000/admin
echo.
echo Close the command windows to stop the services
pause


