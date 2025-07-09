import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/user-messages';

export const sendUserMessage = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const fetchUserMessages = async (userId) => {
  const res = await axios.get(API_BASE, { params: userId ? { userId } : {} });
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
