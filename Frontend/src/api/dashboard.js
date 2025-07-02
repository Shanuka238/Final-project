import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchUserEvents = async (userId) => {
  const res = await axios.get(`${API_BASE}/events/${userId}`);
  return res.data;
};

export const fetchUserBookings = async (userId) => {
  const res = await axios.get(`${API_BASE}/bookings/${userId}`);
  return res.data;
};

export const fetchUserFavorites = async (userId) => {
  const res = await axios.get(`${API_BASE}/favorites/${userId}`);
  return res.data;
};

export const fetchUserActivities = async (userId) => {
  const res = await axios.get(`${API_BASE}/activities/${userId}`);
  return res.data;
};
