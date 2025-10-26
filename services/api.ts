import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const getApiBaseUrl = () => {
  const BACKEND_PORT = '5000';
  const BACKEND_IP = '192.168.1.112'; // Your computer's IP address
  
  return `http://${BACKEND_IP}:${BACKEND_PORT}/api`;
};

const API_BASE_URL = getApiBaseUrl();

// Create axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear stored credentials
      try {
        await AsyncStorage.multiRemove(['token', 'user']);
        console.log('Authentication failed, cleared stored credentials');
        // You could emit an event here to redirect to login
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

// Response type interfaces
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

interface User {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  patientId?: string;
  phone?: string;
  address?: string | object;
  dateOfBirth?: string;
  gender?: string;
  age?: number;
  profilePic?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Appointment {
  _id: string;
  appointmentId: string;
  patient: string;
  patientName: string;
  contactNumber: string;
  email: string;
  address: string;
  age?: number;
  sex?: string;
  service?: string;
  services?: string[];
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  type: string;
  priority: string;
  notes?: string;
  totalPrice?: number;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  _id: string;
  serviceName: string;
  description?: string;
  category?: string;
  price: number;
  isActive: boolean;
  isPopular?: boolean;
  duration?: number;
  requirements?: string;
  preparationInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

interface TestResult {
  _id: string;
  sampleId: string;
  appointment?: string;
  patient: string;
  patientName: string;
  service: string;
  serviceName: string;
  testType: string;
  sampleDate: string;
  results: Record<string, any>;
  status: string;
  isNew: boolean;
  isAbnormal?: boolean;
  isCritical?: boolean;
  medTech?: {
    firstName: string;
    lastName: string;
  };
  pathologist?: {
    firstName: string;
    lastName: string;
  };
  releasedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface MobileLabSchedule {
  _id: string;
  dayOfWeek: number;
  location: {
    name: string;
    barangay: string;
    municipality?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  status: string;
  maxCapacity?: number;
  currentBookings?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string; // Updated to match backend expectation
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post('/auth/register', userData);
      
      // Store token and user data
      if (response.data.success && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: response.data.success,
        message: response.data.message,
        data: {
          user: response.data.user,
          token: response.data.token
        }
      };
    } catch (error: any) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        error: error.response?.data?.error,
        errors: error.response?.data?.errors
      };
    }
  },

  // Login user
  login: async (credentials: {
    identifier: string; // email or username
    password: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', credentials);
      
      // Store token and user data
      if (response.data.success && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: response.data.success,
        message: response.data.message,
        data: {
          user: response.data.user,
          token: response.data.token
        }
      };
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Network error - please check your connection';
      
      if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Backend server is not running';
      } else if (error.response?.status === 404) {
        errorMessage = 'Login endpoint not found';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error - please try again later';
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = error.response?.data?.message || 'Invalid username or password';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data?.error
      };
    }
  },

  // Logout user
  logout: async (): Promise<ApiResponse> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear stored data
      await AsyncStorage.multiRemove(['token', 'user']);
    }
    return { success: true, message: 'Logged out successfully' };
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response: AxiosResponse<{ success: boolean; user: User }> = await api.get('/auth/me');
      return {
        success: response.data.success,
        data: { user: response.data.user }
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get user data',
        error: error.response?.data?.error
      };
    }
  },

  // Update profile
  updateProfile: async (profileData: {
    gender?: string;
    dateOfBirth?: string;
    address?: string;
    phone?: string;
  }): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response: AxiosResponse<{ success: boolean; user: User }> = await api.put('/auth/profile', profileData);
      
      // Update stored user data
      if (response.data.success && response.data.user) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: response.data.success,
        data: { user: response.data.user }
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed',
        error: error.response?.data?.error
      };
    }
  },

  // Change password
  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed',
        error: error.response?.data?.error
      };
    }
  },
};

// Services API functions
export const servicesAPI = {
  // Get all services with filtering and pagination
  getServices: async (params: {
    limit?: number;
    page?: number;
    category?: string;
    isActive?: boolean;
    search?: string;
  } = {}): Promise<ApiResponse<Service[]>> => {
    try {
      console.log('🔍 Making services API call with params:', params);
      
      // Use exact same approach as frontend - simple axios call
      const response: AxiosResponse<{ success: boolean; data: Service[]; message?: string }> = await api.get('/services', { params });
      
      console.log('📡 Services API response:', response.data);
      
      return {
        success: response.data.success,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('❌ Get services error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch services',
        error: error.response?.data?.error
      };
    }
  },

  // Get popular services
  getPopularServices: async (limit: number = 10): Promise<ApiResponse<Service[]>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: Service[] }> = await api.get('/services/popular', { params: { limit } });
      return {
        success: response.data.success,
        data: response.data.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch popular services',
        error: error.response?.data?.error
      };
    }
  },

  // Get service by ID
  getServiceById: async (serviceId: string): Promise<ApiResponse<Service>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: Service }> = await api.get(`/services/${serviceId}`);
      return {
        success: response.data.success,
        data: response.data.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch service',
        error: error.response?.data?.error
      };
    }
  },
};

// Appointment API functions
export const appointmentAPI = {
  // Get appointments with filtering
  getAppointments: async (params: {
    patientId?: string;
    status?: string;
    date?: string;
    limit?: number;
    page?: number;
  } = {}): Promise<ApiResponse<{ data: Appointment[]; pagination?: any }>> => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== null && value !== undefined && value !== '') {
          queryParams.append(key, String(value));
        }
      });
      
      const queryString = queryParams.toString();
      const url = `/appointments${queryString ? `?${queryString}` : ''}`;
      
      const response: AxiosResponse<{ success: boolean; data: Appointment[]; pagination?: any; message?: string }> = await api.get(url);
      return {
        success: true,
        data: {
          data: response.data.data,
          pagination: response.data.pagination
        },
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Get appointments error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch appointments',
        error: error.response?.data?.error
      };
    }
  },

  // Create new appointment
  createAppointment: async (appointmentData: {
    patientId?: string;
    patientName: string;
    contactNumber: string;
    email: string;
    address?: string;
    age?: number;
    sex?: string;
    serviceIds: string[];
    serviceName: string;
    appointmentDate: string;
    appointmentTime: string;
    type?: string;
    priority?: string;
    totalPrice?: number;
    notes?: string;
    reasonForVisit?: string;
  }): Promise<ApiResponse<Appointment>> => {
    try {
      // Get current user to set createdBy fields
      const userData = await AsyncStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      const payload = {
        ...appointmentData,
        createdBy: user?._id || user?.id,
        createdByName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Patient'
      };
      
      console.log('🧑‍⚕️ MOBILE APPOINTMENT DEBUG:');
      console.log('   Creating appointment with payload:', payload);
      
      const response: AxiosResponse<{ success: boolean; data: Appointment; message?: string }> = await api.post('/appointments', payload);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Create appointment error:', error);
      console.error('Error response data:', error.response?.data);
      
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create appointment',
        error: error.response?.data?.error,
        errors: error.response?.data?.errors
      };
    }
  },

  // Update appointment
  updateAppointment: async (appointmentId: string, updateData: {
    appointmentDate?: string;
    appointmentTime?: string;
    status?: string;
    notes?: string;
  }): Promise<ApiResponse<Appointment>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: Appointment; message?: string }> = await api.put(`/appointments/${appointmentId}`, updateData);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Update appointment error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update appointment',
        error: error.response?.data?.error
      };
    }
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId: string, reason: string = ''): Promise<ApiResponse<Appointment>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: Appointment; message?: string }> = await api.put(`/appointments/${appointmentId}/cancel`, { reason });
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Cancel appointment error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to cancel appointment',
        error: error.response?.data?.error
      };
    }
  },
};

// Test Results API functions
export const testResultsAPI = {
  // Get patient's own released test results
  getMyTestResults: async (): Promise<ApiResponse<{ data: TestResult[]; count: number }>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: TestResult[]; count: number; message?: string }> = await api.get('/test-results/my');
      return {
        success: true,
        data: {
          data: response.data.data,
          count: response.data.count
        },
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Get my test results error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch your test results',
        error: error.response?.data?.error
      };
    }
  },

  // Mark test result as viewed
  markAsViewed: async (testResultId: string): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<{ success: boolean; message?: string }> = await api.put(`/test-results/${testResultId}/mark-viewed`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Mark as viewed error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to mark test result as viewed',
        error: error.response?.data?.error
      };
    }
  },
};

// Mobile Lab API functions
export const mobileLabAPI = {
  // Get current week's mobile lab schedule
  getCurrentWeekSchedule: async (): Promise<ApiResponse<MobileLabSchedule[]>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: MobileLabSchedule[]; message?: string }> = await api.get('/mobile-lab/current-week');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Get current week schedule error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch current week schedule',
        error: error.response?.data?.error
      };
    }
  },

  // Get currently active mobile lab location
  getCurrentActiveLocation: async (): Promise<ApiResponse<MobileLabSchedule | null>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: MobileLabSchedule | null; message?: string }> = await api.get('/mobile-lab/current-active');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Get current active location error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch current active location',
        error: error.response?.data?.error
      };
    }
  },

  // Get next scheduled mobile lab location
  getNextLocation: async (): Promise<ApiResponse<MobileLabSchedule | null>> => {
    try {
      const response: AxiosResponse<{ success: boolean; data: MobileLabSchedule | null; message?: string }> = await api.get('/mobile-lab/next-location');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Get next location error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch next location',
        error: error.response?.data?.error
      };
    }
  },
};

// Utility functions for authentication
export const authUtils = {
  // Check if user is logged in
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      return !!(token && user);
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },

  // Get stored user data
  getStoredUser: async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  },

  // Get stored token
  getStoredToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  },

  // Clear all stored auth data
  clearAuthData: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },

  // Check if user has specific role
  hasRole: async (role: string): Promise<boolean> => {
    try {
      const user = await authUtils.getStoredUser();
      return user?.role === role;
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  },

  // Check if user is patient
  isPatient: async (): Promise<boolean> => {
    return await authUtils.hasRole('patient');
  },
};

export default api;

// Export types for use in components
export type {
  ApiResponse, Appointment, MobileLabSchedule, Service,
  TestResult, User
};

