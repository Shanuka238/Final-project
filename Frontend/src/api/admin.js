import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/admin';

export const fetchClerkUsers = async () => {
  const res = await axios.get(`${API_BASE}/users`);
  return res.data;
};

export const createClerkUser = async (email, password, username) => {
  const res = await axios.post(`${API_BASE}/users`, { email, password, username });
  return res.data;
};

export const deleteClerkUser = async (userId) => {
  const res = await axios.delete(`${API_BASE}/users/${userId}`);
  return res.data;
};
