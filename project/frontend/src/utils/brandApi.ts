// Brand API utility for proxied external API calls
const BRAND_API_BASE_URL = '/api/brand';

// Types for brand API responses
export interface BrandApiResponse {
  // Add specific types based on the external API response
  [key: string]: any;
}

// API request helper for brand API
const brandApiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${BRAND_API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Brand API error: ${response.status}`);
  }

  return await response.json();
};

// Brand API methods
export const brandAPI = {
  // Get root API info
  getInfo: async (): Promise<BrandApiResponse> => {
    return await brandApiRequest('');
  },

  // Generic method for any endpoint
  request: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<BrandApiResponse> => {
    return await brandApiRequest(endpoint, options);
  },

  // Example method for specific endpoints
  getEndpoint: async (endpoint: string): Promise<BrandApiResponse> => {
    return await brandApiRequest(`/${endpoint}`);
  },

  // POST method for specific endpoints
  postToEndpoint: async (
    endpoint: string,
    data: any
  ): Promise<BrandApiResponse> => {
    return await brandApiRequest(`/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export default brandAPI;
