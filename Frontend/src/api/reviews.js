import axios from 'axios';
import { getToken } from '../utils/auth';

const API_BASE = 'https://party-nest.vercel.app/api';

const api = axios.create();
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const fetchAllReviews = async () => {
  const res = await api.get(`${API_BASE}/bookings/stored-reviews`);
  return res.data;
};
