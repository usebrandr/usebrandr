# Brandr Platform

A complete authentication system with clear separation of concerns between Django backend and React frontend.

## 🏗️ Project Structure

```
brandr-platform/
├── backend/                    # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── django_project/        # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── auth_app/             # Authentication app
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── ai_views.py
│   ├── db.sqlite3
│   └── venv/
├── frontend/                  # React Application
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── auth/
│       │   │   └── LoginModal.tsx
│       │   ├── dashboard/
│       │   │   └── Dashboard.tsx
│       │   └── common/
│       │       └── BrandrLogo.tsx
│       ├── services/
│       │   └── api.ts
│       ├── types/
│       │   └── auth.ts
│       ├── utils/
│       │   └── constants.ts
│       ├── App.tsx
│       └── main.tsx
└── README.md
```

## 🚀 Quick Start

### Option 1: Simple Startup Script (Recommended)

**macOS/Linux:**
```bash
./start.sh
```

**Windows:**
```bash
start.bat
```

### Option 2: Using npm scripts

```bash
# Install dependencies
npm run install:all

# Setup backend (first time only)
npm run setup

# Start both services
npm run dev
```

### Option 3: Manual Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📋 Features

### Backend (Django + DRF)
- ✅ **JWT Authentication** with `djangorestframework-simplejwt`
- ✅ **User Registration** with business/influencer type selection
- ✅ **Protected Routes** with authentication middleware
- ✅ **CORS Configuration** for frontend access
- ✅ **Django Admin** for user management
- ✅ **Modular Architecture** with clear app separation

### Frontend (React + TypeScript)
- ✅ **Modern UI** with Tailwind CSS and gradient designs
- ✅ **Type Safety** with TypeScript interfaces
- ✅ **State Management** with React hooks
- ✅ **API Integration** with axios and interceptors
- ✅ **Error Handling** with comprehensive feedback
- ✅ **Responsive Design** for all devices

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user (with user_type)
- `POST /api/auth/login/` - Login with username/password
- `GET /api/auth/user/` - Get current user info
- `POST /api/auth/logout/` - Logout (blacklist refresh token)

### Protected Routes
- `GET /api/auth/ai/answer/` - Protected AI endpoint (requires authentication)

## 🎨 Architecture Principles

### Backend Architecture
- **Separation of Concerns**: Each app has a single responsibility
- **RESTful Design**: Clean API endpoints with proper HTTP methods
- **Security First**: JWT tokens, CORS, password validation
- **Scalable Structure**: Easy to add new apps and features

### Frontend Architecture
- **Component-Based**: Reusable, modular components
- **Type Safety**: Full TypeScript integration
- **Service Layer**: Centralized API communication
- **State Management**: Clean state handling with React hooks

## 🔐 Security Features

- **JWT Authentication** with token expiration
- **Password Validation** with Django's built-in validators
- **CORS Protection** for cross-origin requests
- **Token Blacklisting** on logout
- **Input Validation** on both frontend and backend

## 📱 User Experience

- **Modern Design** with gradients and smooth animations
- **Responsive Layout** that works on all devices
- **Clear Feedback** for all user actions
- **Loading States** with spinners and progress indicators
- **Error Handling** with user-friendly messages

## 🧪 Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
- Use production WSGI server (Gunicorn)
- Set up environment variables
- Configure database (PostgreSQL recommended)
- Set up static file serving

### Frontend Deployment
- Build for production: `npm run build`
- Deploy to CDN or static hosting
- Configure environment variables

## 📚 Documentation

- **API Documentation**: Available at `/api/docs/` (when using drf-spectacular)
- **Component Documentation**: Each component has TypeScript interfaces
- **Service Documentation**: API service methods are well-documented

## 🔄 Development Workflow

1. **Backend Development**: Work in `backend/` directory
2. **Frontend Development**: Work in `frontend/` directory
3. **API Integration**: Use the service layer in `frontend/src/services/`
4. **Testing**: Run tests in respective directories
5. **Deployment**: Deploy backend and frontend separately

## 🛠️ Available Scripts

### Root Level Scripts
- `npm run dev` - Start both backend and frontend
- `npm run dev:backend` - Start only Django backend
- `npm run dev:frontend` - Start only React frontend
- `npm run install:all` - Install all dependencies
- `npm run setup` - Complete setup (dependencies + virtual environment)

### Shell Scripts
- `./start.sh` - Start both services (macOS/Linux)
- `start.bat` - Start both services (Windows)

This architecture provides clear separation of concerns, making the codebase maintainable, scalable, and easy to understand.
