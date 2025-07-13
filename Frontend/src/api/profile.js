import axios from 'axios';

export const updateUserProfile = async (data, token) => {
  const res = await axios.put(
    '/api/user/profile',
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const fetchUserProfile = async (token) => {
  const res = await axios.get('/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
