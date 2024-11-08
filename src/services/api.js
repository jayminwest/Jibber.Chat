import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export const chat = {
  sendMessage: (message) => api.post('/chat/message', { message }),
  getHistory: () => api.get('/chat/history'),
};

export const payment = {
  createCheckoutSession: (priceId) => api.post('/payment/create-checkout-session', { priceId }),
};

export default api;
