# Brandr Platform Architecture

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
│   │   ├── models.py         # UserProfile model
│   │   ├── views.py          # API endpoints
│   │   ├── serializers.py    # Data serialization
│   │   ├── urls.py           # URL routing
│   │   ├── admin.py          # Admin interface
│   │   └── ai_views.py       # AI endpoints
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

## 🎯 Separation of Concerns

### Backend Architecture

#### **Django Project Structure**
- **`django_project/`**: Contains Django settings, URLs, and WSGI configuration
- **`auth_app/`**: Dedicated authentication application with clear responsibilities

#### **Authentication App (`auth_app/`)**
- **`models.py`**: UserProfile model for extended user data
- **`views.py`**: API endpoints for authentication
- **`serializers.py`**: Data validation and transformation
- **`urls.py`**: URL routing for auth endpoints
- **`admin.py`**: Django admin customization
- **`ai_views.py`**: Protected AI endpoints

#### **Key Backend Principles**
1. **Single Responsibility**: Each app has one clear purpose
2. **RESTful Design**: Clean API endpoints with proper HTTP methods
3. **Security First**: JWT tokens, CORS, password validation
4. **Scalable Structure**: Easy to add new apps and features

### Frontend Architecture

#### **Component Organization**
- **`components/auth/`**: Authentication-related components
- **`components/dashboard/`**: Dashboard and main app components
- **`components/common/`**: Reusable UI components

#### **Service Layer**
- **`services/api.ts`**: Centralized API communication
- **`types/auth.ts`**: TypeScript interfaces for type safety
- **`utils/constants.ts`**: Configuration and constants

#### **Key Frontend Principles**
1. **Component-Based**: Reusable, modular components
2. **Type Safety**: Full TypeScript integration
3. **Service Layer**: Centralized API communication
4. **State Management**: Clean state handling with React hooks

## 🔧 API Design

### Authentication Endpoints
```typescript
// Registration
POST /api/auth/register/
{
  username: string,
  email: string,
  password: string,
  password2: string,
  user_type: 'business' | 'influencer'
}

// Login
POST /api/auth/login/
{
  username: string,
  password: string
}

// Get Current User
GET /api/auth/user/

// Logout
POST /api/auth/logout/
{
  refresh: string
}
```

### Protected Endpoints
```typescript
// AI Answer (requires authentication)
GET /api/auth/ai/answer/
```

## 🔐 Security Architecture

### Authentication Flow
1. **Registration**: User creates account with user_type
2. **Login**: User authenticates with credentials
3. **Token Storage**: JWT tokens stored in localStorage
4. **API Requests**: Bearer token included in Authorization header
5. **Token Validation**: Backend validates tokens on protected routes
6. **Logout**: Refresh token blacklisted

### Security Features
- **JWT Authentication** with token expiration
- **Password Validation** with Django's built-in validators
- **CORS Protection** for cross-origin requests
- **Token Blacklisting** on logout
- **Input Validation** on both frontend and backend

## 📱 User Experience Architecture

### Component Design
- **Modern UI**: Gradients, smooth animations, responsive design
- **Type Safety**: Full TypeScript integration with interfaces
- **Error Handling**: Comprehensive error states and feedback
- **Loading States**: Spinners and progress indicators
- **Form Validation**: Real-time validation with clear feedback

### State Management
- **React Hooks**: Clean state management
- **Service Layer**: Centralized API communication
- **Local Storage**: Persistent authentication state
- **Error Boundaries**: Graceful error handling

## 🚀 Development Workflow

### Backend Development
```bash
cd backend
source venv/bin/activate
python manage.py runserver 8000
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Testing
```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test
```

## 📊 Data Flow

### Registration Flow
1. User fills registration form
2. Frontend validates input
3. API request to `/api/auth/register/`
4. Backend validates and creates user
5. UserProfile created with user_type
6. JWT tokens returned
7. Frontend stores tokens and user data
8. User redirected to dashboard

### Login Flow
1. User enters credentials
2. Frontend validates input
3. API request to `/api/auth/login/`
4. Backend authenticates user
5. JWT tokens returned
6. Frontend stores tokens and user data
7. User redirected to dashboard

### Protected Route Access
1. Frontend includes Bearer token in request
2. Backend validates JWT token
3. If valid, returns protected data
4. If invalid, returns 401 Unauthorized
5. Frontend handles 401 by redirecting to login

## 🔄 Deployment Architecture

### Backend Deployment
- **WSGI Server**: Gunicorn for production
- **Database**: PostgreSQL for production
- **Environment Variables**: Secure configuration
- **Static Files**: CDN or static hosting

### Frontend Deployment
- **Build Process**: `npm run build`
- **Static Hosting**: CDN or static hosting
- **Environment Variables**: API endpoint configuration
- **CORS Configuration**: Backend allows frontend domain

## 📈 Scalability Considerations

### Backend Scalability
- **App-Based Structure**: Easy to add new Django apps
- **Database Optimization**: Proper indexing and queries
- **Caching**: Redis for session and data caching
- **Load Balancing**: Multiple server instances

### Frontend Scalability
- **Component Reusability**: Shared components
- **Code Splitting**: Lazy loading for performance
- **State Management**: Centralized state as app grows
- **API Abstraction**: Service layer for easy maintenance

This architecture provides clear separation of concerns, making the codebase maintainable, scalable, and easy to understand.


