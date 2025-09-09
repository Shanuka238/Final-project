import axios from 'axios';
import { getToken } from 'utils/auth';

const API_BASE = 'https://party-nest.vercel.app/api/user-messages';

export const sendUserMessage = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const fetchUserMessages = async ({ userId, email } = {}) => {
  const params = {};
  if (userId) params.userId = userId;
  if (email) params.email = email;
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await axios.get(API_BASE, { params, headers });
  return res.data;
};

export const sendAdminReply = async (messageId, content) => {
  const res = await axios.post(`${API_BASE}/${messageId}/reply`, { content });
  return res.data;
};

export const fetchUserMessage = async (messageId) => {
  const res = await axios.get(`${API_BASE}/${messageId}`);
  return res.data;
};
