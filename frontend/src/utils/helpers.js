// Utility functions for the application
import axios from 'axios';

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Helper untuk membersihkan URL dari trailing slash agar tidak rusak saat digabungkan
export const getCleanBaseUrl = (url) => {
  if (!url) return '';
  return url.replace(/\/+$/, '');
};

// API utility functions
export const api = axios.create({
  baseURL: getCleanBaseUrl(import.meta.env.VITE_API_BASE_URL),
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  dimensi: {
    getAll: () => api.get('/dimensi'),
    getById: (id) => api.get(`/dimensi/${id}`),
    create: (data) => api.post('/dimensi', data),
    update: (id, data) => api.put(`/dimensi/${id}`, data),
    delete: (id) => api.delete(`/dimensi/${id}`),
  },
  agenda: {
    getAll: () => api.get('/events'),
    getById: (id) => api.get(`/events/${id}`),
    getAllPublic: () => api.get('/events'),
getfile: (id) => api.get(`/events/${id}/image`),
  },
  publications: {
    getAll: () => api.get('/publikasi'),
    getById: (id) => api.get(`/publikasi/${id}`),
    getAllPublic: () => api.get('/publikasi'),
    getfile: (id) => api.get(`/publikasi/${id}/file`),
  },
  menu: {
    getAll: () => axios.get('https://dev.tangerangkab.my.id/smartcity-cms/menusetting/menu'),
    getById: (id) => axios.get(`https://dev.tangerangkab.my.id/smartcity-cms/menusetting/menu/${id}`),
    getAllPublic: () => axios.get('https://dev.tangerangkab.my.id/smartcity-cms/menusetting/menu'),
  },
  
  images: {
    getAll: () => api.get('/images'),
    upload: (data) => api.post('/images', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  },
  files: {
    getAll: () => api.get('/files'),
    upload: (data) => api.post('/files', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  },
  inovasi: {
    getAll: (dimensiId = null) => {
      const params = dimensiId ? { dimensiId } : {};
      return api.get('/inovasi', { params });
    },
    getById: (id) => api.get(`/inovasi/${id}`),
    getfile: (id) => api.get(`/inovasi/${id}/image`),
  },
  auth: {
    login: (data) => api.post('/auth/signin', data),
    register: (data) => api.post('/cms/auth/register', data),
    refreshToken: (data) => api.post('/userRefreshToken', data),
  },
};

// Utility for Publication page API base
export const getPublikasiBaseUrl = () => {
  const url = import.meta.env.VITE_PUBLIKASI_BASE_URL || 'https://dev.tangerangkab.my.id/smartcity-api';
  return getCleanBaseUrl(url);
};

// Add more utility functions as needed