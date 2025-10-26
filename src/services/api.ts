import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { User, LoginCredentials, Product, Order, Transaction, CreateProductDTO, CreateOrderDTO } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An unexpected error occurred.');
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

export const productsAPI = {
  getAll: async (page = 0, size = 10): Promise<{ content: Product[]; totalElements: number }> => {
    const response = await apiClient.get(`/products?page=${page}&size=${size}`);
    return response.data;
  },
  
  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  
  create: async (product: CreateProductDTO): Promise<Product> => {
    const response = await apiClient.post('/products', product);
    return response.data;
  },
  
  update: async (id: number, product: Partial<CreateProductDTO>): Promise<Product> => {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};

export const ordersAPI = {
  getAll: async (page = 0, size = 10): Promise<{ content: Order[]; totalElements: number }> => {
    const response = await apiClient.get(`/orders?page=${page}&size=${size}`);
    return response.data;
  },
  
  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },
  
  create: async (order: CreateOrderDTO): Promise<Order> => {
    const response = await apiClient.post('/orders', order);
    return response.data;
  },
};

export const transactionsAPI = {
  getAll: async (page = 0, size = 10): Promise<{ content: Transaction[]; totalElements: number }> => {
    const response = await apiClient.get(`/transactions?page=${page}&size=${size}`);
    return response.data;
  },
  
  create: async (transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> => {
    const response = await apiClient.post('/transactions', transaction);
    return response.data;
  },
};

export default apiClient;