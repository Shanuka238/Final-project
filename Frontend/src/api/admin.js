import axios from 'axios';
import { getToken } from '../utils/auth';

const API_BASE = 'https://party-nest.vercel.app/api/admin';

const api = axios.create();
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const fetchStaffMessages = async (staffId) => {
  const res = await api.get(`${API_BASE}/messages/${staffId}`);
  return res.data;
};

export const sendStaffMessage = async (staffId, sender, content, staffName, staffEmail) => {
  const res = await api.post(`${API_BASE}/messages/${staffId}`, { sender, content, staffName, staffEmail });
  return res.data;
};

export const fetchMongoUsers = async () => {
  const res = await api.get(`${API_BASE}/users`);
  return res.data;
};

export const createUser = async (email, password, username, role) => {
  const res = await api.post(`${API_BASE}/users`, { email, password, username, role });
  return res.data;
};

export const deleteClerkUser = async (userId) => {
  const res = await api.delete(`${API_BASE}/users/${userId}`);
  return res.data;
};


export const fetchDashboardSummary = async () => {
  const res = await api.get(`${API_BASE}/dashboard-summary`);
  return res.data;
};

export const fetchAllEvents = async () => {
  const res = await api.get(`${API_BASE}/events`);
  return res.data;
};

export const fetchAllBookings = async () => {
  const res = await api.get(`${API_BASE}/bookings`);
  return res.data;
};

export const fetchAllPackages = async () => {
  const res = await api.get(`${API_BASE}/packages`);
  return res.data;
};
