import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export const staticUrl = import.meta.env.VITE_STATIC_URL || '';
