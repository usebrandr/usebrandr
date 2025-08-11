// API Configuration
export const API_BASE_URL = 'http://localhost:8000/api';

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register/',
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  USER: '/auth/user/',
  AI_ANSWER: '/auth/ai/answer/',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

// User Types
export const USER_TYPES = {
  BUSINESS: 'business',
  INFLUENCER: 'influencer',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  LOGIN_FAILED: 'Login failed. Please try again.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  AUTHENTICATION_REQUIRED: 'Authentication required',
} as const;


