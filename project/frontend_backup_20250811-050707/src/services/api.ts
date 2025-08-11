import axios from 'axios';
import { 
  User, 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  ApiResponse 
} from '../types/auth';
import { 
  API_BASE_URL, 
  AUTH_ENDPOINTS, 
  STORAGE_KEYS, 
  ERROR_MESSAGES 
} from '../utils/constants';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear tokens and redirect to login
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      // Redirect to login page
      window.location.href = '/';
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Login user with credentials
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      console.log('Attempting login with credentials:', credentials);
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
      console.log('Login response:', response.data);
      const { user, access, refresh } = response.data;
      
      // Store tokens and user data
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      
      console.log('Login successful, tokens stored');
      return { data: response.data };
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      if (error.response?.data?.error) {
        return { error: error.response.data.error };
      }
      if (error.response?.data?.non_field_errors && Array.isArray(error.response.data.non_field_errors)) {
        return { error: error.response.data.non_field_errors[0] };
      }
      if (error.response?.data?.username && Array.isArray(error.response.data.username)) {
        return { error: error.response.data.username[0] };
      }
      if (error.response?.data?.password && Array.isArray(error.response.data.password)) {
        return { error: error.response.data.password[0] };
      }
      return { error: ERROR_MESSAGES.LOGIN_FAILED };
    }
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    try {
      console.log('Attempting registration with data:', userData);
      const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
      console.log('Registration response:', response.data);
      const { user, access, refresh } = response.data;
      
      // Store tokens and user data
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      
      console.log('Registration successful, tokens stored');
      return { data: response.data };
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      if (error.response?.data) {
        const errors = error.response.data;
        
        // Handle field-specific errors
        if (errors.username && Array.isArray(errors.username)) {
          return { error: errors.username[0] };
        }
        if (errors.email && Array.isArray(errors.email)) {
          return { error: errors.email[0] };
        }
        if (errors.password && Array.isArray(errors.password)) {
          return { error: errors.password[0] };
        }
        if (errors.password2 && Array.isArray(errors.password2)) {
          return { error: errors.password2[0] };
        }
        if (errors.first_name && Array.isArray(errors.first_name)) {
          return { error: errors.first_name[0] };
        }
        if (errors.last_name && Array.isArray(errors.last_name)) {
          return { error: errors.last_name[0] };
        }
        
        // Handle non-field errors
        if (errors.non_field_errors && Array.isArray(errors.non_field_errors)) {
          return { error: errors.non_field_errors[0] };
        }
        
        // If we have errors but can't identify the specific field, show the first error
        const errorMessages = Object.values(errors).flat();
        if (errorMessages.length > 0) {
          return { error: errorMessages[0] as string };
        }
        
        return { error: ERROR_MESSAGES.REGISTRATION_FAILED };
      }
      return { error: ERROR_MESSAGES.REGISTRATION_FAILED };
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      const refresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (refresh) {
        await apiClient.post(AUTH_ENDPOINTS.LOGOUT, { refresh });
      }
      
      // Clear local storage
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      return { data: { success: true } };
    } catch (error: any) {
      // Even if logout fails, clear local storage
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      return { data: { success: true } };
    }
  },

  /**
   * Get current user info
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.get(AUTH_ENDPOINTS.USER);
      return { data: response.data };
    } catch (error: any) {
      return { error: 'Failed to get user info' };
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Get stored user data
   */
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },
};

/**
 * AI Service
 * Handles AI-related API calls
 */
export const aiService = {
  /**
   * Get AI answer from protected endpoint
   */
  getAnswer: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(AUTH_ENDPOINTS.AI_ANSWER);
      return { data: response.data };
    } catch (error: any) {
      if (error.response?.status === 401) {
        return { error: ERROR_MESSAGES.AUTHENTICATION_REQUIRED };
      }
      return { error: 'Failed to get AI response' };
    }
  },
};

// Export the main API object for backward compatibility
export const api = {
  auth: authService,
  ai: aiService,
}; 