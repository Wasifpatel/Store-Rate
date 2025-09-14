const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    address: string;
    role: string;
  }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Store endpoints
  async getStores() {
    return this.request('/api/stores');
  }

  async getStore(id: string) {
    return this.request(`/api/stores/${id}`);
  }

  async createStore(storeData: any) {
    return this.request('/api/stores', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
  }

  // Rating endpoints
  async getRatings(storeId?: string) {
    const endpoint = storeId ? `/api/ratings?storeId=${storeId}` : '/api/ratings';
    return this.request(endpoint);
  }

  async createRating(ratingData: {
    storeId: string;
    rating: number;
    review?: string;
  }) {
    return this.request('/api/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  }

  // User endpoints
  async getUsers() {
    return this.request('/api/users');
  }

  async getUser(id: string) {
    return this.request(`/api/users/${id}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }
}

export const apiService = new ApiService();
