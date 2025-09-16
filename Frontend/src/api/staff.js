import axios from 'axios';
import { getToken } from '../utils/auth';

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create();
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const fetchStaffServices = async () => {
  const res = await api.get(`${API_BASE}/staff/services`);
  return res.data;
};

export const fetchStaffService = async (serviceId) => {
  const res = await api.get(`${API_BASE}/staff/services/${serviceId}`);
  return res.data;
};

export const addStaffService = async (service) => {
  const res = await api.post(`${API_BASE}/staff/services`, service);
  return res.data;
};

export const updateStaffService = async (serviceId, service) => {
  const res = await api.put(`${API_BASE}/staff/services/${serviceId}`, service);
  return res.data;
};

export const deleteStaffService = async (serviceId) => {
  const res = await api.delete(`${API_BASE}/staff/services/${serviceId}`);
  return res.data;
};

export const addNewPackage = async (pkg) => {
  const res = await api.post(`${API_BASE}/staff/packages`, pkg);
  return res.data;
};

export const deletePackage = async (packageId) => {
  const res = await api.delete(`${API_BASE}/staff/packages/${packageId}`);
  return res.data;
};

export const updatePackage = async (packageId, pkg) => {
  const res = await api.put(`${API_BASE}/staff/packages/${packageId}`, pkg);
  return res.data;
};
