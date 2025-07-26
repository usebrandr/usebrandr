// API utility functions for Brandr frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  details?: any;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  user_type: 'business' | 'influencer';
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  user_type: 'business' | 'influencer';
  is_verified: boolean;
  profile?: any;
}

// Token management
export const tokenManager = {
  getAccessToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refresh_token');
  },

  setTokens: (tokens: AuthTokens): void => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  },

  clearTokens: (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getAccessToken();
  }
};

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = tokenManager.getAccessToken();

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    // Handle empty responses
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      return {
        error: data.error || data.message || `Request failed with status ${response.status}`,
        details: data.details || data
      };
    }

    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      error: 'Network error. Please check your connection.'
    };
  }
}

// Authentication API calls
export const api = {
  auth: {
    signup: async (userData: SignupData): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
      const response = await apiRequest<{ user: User; tokens: AuthTokens }>('/auth/signup/', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (response.data?.tokens) {
        tokenManager.setTokens(response.data.tokens);
      }

      return response;
    },

    login: async (credentials: LoginData): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
      const response = await apiRequest<{ user: User; tokens: AuthTokens }>('/auth/login/', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.data?.tokens) {
        tokenManager.setTokens(response.data.tokens);
      }

      return response;
    },

    logout: async (): Promise<ApiResponse<{ message: string }>> => {
      const refreshToken = tokenManager.getRefreshToken();
      const response = await apiRequest<{ message: string }>('/auth/logout/', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      // Clear tokens regardless of response
      tokenManager.clearTokens();

      return response;
    },

    getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
      return apiRequest<{ user: User }>('/auth/profile/');
    },

    updateProfile: async (profileData: any): Promise<ApiResponse<{ user: User }>> => {
      return apiRequest<{ user: User }>('/auth/profile/update/', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });
    },

    // Refresh token
    refreshToken: async (): Promise<ApiResponse<AuthTokens>> => {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) {
        return { error: 'No refresh token available' };
      }

      const response = await apiRequest<AuthTokens>('/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.data) {
        tokenManager.setTokens(response.data);
      }

      return response;
    }
  }
};

export default api;