import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api/user/profile`;

export const updateUserProfile = async (data, token) => {
  const res = await axios.put(
    API_BASE,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const fetchUserProfile = async (token) => {
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
