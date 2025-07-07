import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchUserEvents = async (userId) => {
  const res = await axios.get(`${API_BASE}/events/${userId}`);
  return res.data;
};

export const fetchUserBookings = async (userId) => {
  const res = await axios.get(`${API_BASE}/user-bookings/${userId}`);
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

export const fetchUserUpcomingEvents = async (userId) => {
  const res = await axios.get(`${API_BASE}/user-upcoming-events/${userId}`);
  return res.data;
};

export const addPackageToFavorites = async (userId, pkg) => {
  const res = await axios.post(`${API_BASE}/favorites/package`, { userId, pkg });
  return res.data;
};

export const removeFavorite = async (favoriteId) => {
  const res = await axios.delete(`${API_BASE}/favorites/${favoriteId}`);
  return res.data;
};

export const addNewPackage = async (pkg) => {
  const res = await axios.post(`${API_BASE}/packages`, pkg);
  return res.data;
};

export const deletePackage = async (packageId) => {
  const res = await axios.delete(`${API_BASE}/packages/${packageId}`);
  return res.data;
};

export const updatePackage = async (packageId, pkg) => {
  const res = await axios.put(`${API_BASE}/packages/${packageId}`, pkg);
  return res.data;
};
