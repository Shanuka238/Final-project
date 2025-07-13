// Fetch all packages booked by a user
export const fetchUserPackages = async (userId) => {
  const res = await api.get(`${API_BASE}/packages/user/${userId}`);
  return res.data;
};
import axios from 'axios';
import { getToken } from '../utils/auth';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create();
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Delete a user package booking
export const deleteUserPackage = async (userPackageId) => {
  const res = await api.delete(`${API_BASE}/packages/user-booking/${userPackageId}`);
  return res.data;
};

// Pay for a user package booking
export const payUserPackage = async (userPackageId, amount, paymentIntentId) => {
  const res = await api.patch(`${API_BASE}/packages/user-booking/${userPackageId}/pay`, { amount, paymentIntentId });
  return res.data;
};
