import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'sonner';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          toast.error(data.message || 'Bad Request');
          break;
        case 401:
          toast.error('Unauthorized - Please login again');
          // Redirect to login or clear auth
          break;
        case 403:
          toast.error('Forbidden - You don\'t have permission');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 422:
          // Validation errors
          if (data.errors) {
            Object.values(data.errors).forEach((error: any) => {
              toast.error(error);
            });
          } else {
            toast.error(data.message || 'Validation failed');
          }
          break;
        case 500:
          toast.error('Server error - Please try again later');
          break;
        default:
          toast.error(data.message || 'An unexpected error occurred');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error - Please check your connection');
    } else {
      // Other error
      toast.error('An unexpected error occurred');
    }
    
    console.error('❌ API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
