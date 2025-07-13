// Staff messaging API
export const fetchStaffMessages = async (staffId) => {
  const res = await axios.get(`${API_BASE}/messages/${staffId}`);
  return res.data;
};

export const sendStaffMessage = async (staffId, sender, content, staffName, staffEmail) => {
  const res = await axios.post(`${API_BASE}/messages/${staffId}`, { sender, content, staffName, staffEmail });
  return res.data;
};
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/admin';

export const fetchClerkUsers = async () => {
  const res = await axios.get(`${API_BASE}/users`);
  return res.data;
};

export const createClerkUser = async (email, password, username, role, metadata) => {
  const res = await axios.post(`${API_BASE}/users`, { email, password, username, role, metadata });
  return res.data;
};

export const deleteClerkUser = async (userId) => {
  const res = await axios.delete(`${API_BASE}/users/${userId}`);
  return res.data;
};

// Dashboard summary API
export const fetchDashboardSummary = async () => {
  const res = await axios.get(`${API_BASE}/dashboard-summary`);
  return res.data;
};

export const fetchAllEvents = async () => {
  const res = await axios.get(`${API_BASE}/events`);
  return res.data;
};

export const fetchAllBookings = async () => {
  const res = await axios.get(`${API_BASE}/bookings`);
  return res.data;
};

export const fetchAllPackages = async () => {
  const res = await axios.get(`${API_BASE}/packages`);
  return res.data;
};
