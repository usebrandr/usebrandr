// Mock API for demo purposes
type ApiSuccess<T> = { data: T; error?: string };

interface AuthUser {
  user: {
    id: number;
    username: string;
    email: string;
    user_type: string;
  };
  token: string;
}

export const api = {
  auth: {
    login: async (
      credentials: { username: string; password: string; user_type: string }
    ): Promise<ApiSuccess<AuthUser>> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      return {
        data: {
          user: {
            id: 1,
            username: credentials.username,
            email: `${credentials.username}@example.com`,
            user_type: credentials.user_type
          },
          token: 'mock-jwt-token'
        }
      };
    },

    signup: async (
      userData: {
        username: string;
        email: string;
        password: string;
        confirm_password?: string;
        user_type: string;
      }
    ): Promise<ApiSuccess<AuthUser>> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful signup
      return {
        data: {
          user: {
            id: 2,
            username: userData.username,
            email: userData.email,
            user_type: userData.user_type
          },
          token: 'mock-jwt-token'
        }
      };
    }
  }
};