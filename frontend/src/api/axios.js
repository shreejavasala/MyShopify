import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL; // from vercel env

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
