// Book a package for a user (not a booking)
export const bookUserPackage = async (userId, packageData) => {
  const res = await api.post(`${API_BASE}/packages/book`, { userId, ...packageData });
  return res.data;
};

// Fetch all packages booked by a user
export const fetchUserPackages = async (userId) => {
  const res = await api.get(`${API_BASE}/packages/user/${userId}`);
  return res.data;
};
// Delete a booking (used in BookingManagement)
export const deleteBooking = async (bookingId) => {
  const res = await api.delete(`${API_BASE}/bookings/${bookingId}`);
  return res.data;
};
// Pay for a booking (used in BookingManagement)
export const payBooking = async (bookingId, amount, paymentIntentId) => {
  const res = await api.patch(`${API_BASE}/bookings/${bookingId}/pay`, { amount, paymentIntentId });
  return res.data;
};

// Book an event for a user (used in event booking form)
export const bookEvent = async (userId, eventData, bookingData) => {
  const res = await api.post(`${API_BASE}/bookings/book-event`, { userId, eventData, bookingData });
  return res.data;
};

import axios from 'axios';
import { getToken } from '../utils/auth';

const API_BASE = 'http://localhost:5000/api';

// Axios instance with JWT
const api = axios.create();
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


export const fetchUserEvents = async (userId) => {
  const res = await api.get(`${API_BASE}/events/${userId}`);
  return res.data;
};


export const fetchUserBookings = async (userId) => {
  const res = await api.get(`${API_BASE}/bookings/${userId}`);
  return res.data;
};


export const fetchUserFavorites = async (userId) => {
  const res = await api.get(`${API_BASE}/favorites/${userId}`);
  return res.data;
};


export const fetchUserActivities = async (userId) => {
  const res = await api.get(`${API_BASE}/activities/${userId}`);
  return res.data;
};


export const fetchUserUpcomingEvents = async (userId) => {
  const res = await api.get(`${API_BASE}/events/upcoming/${userId}`);
  return res.data;
};


export const addPackageToFavorites = async (userId, pkg) => {
  const res = await api.post(`${API_BASE}/favorites/package`, { userId, pkg });
  return res.data;
};


export const removeFavorite = async (favoriteId) => {
  const res = await api.delete(`${API_BASE}/favorites/${favoriteId}`);
  return res.data;
};


export const addNewPackage = async (pkg) => {
  const res = await api.post(`${API_BASE}/packages`, pkg);
  return res.data;
};


export const deletePackage = async (packageId) => {
  const res = await api.delete(`${API_BASE}/packages/${packageId}`);
  return res.data;
};


export const updatePackage = async (packageId, pkg) => {
  const res = await api.put(`${API_BASE}/packages/${packageId}`, pkg);
  return res.data;
};


export const fetchEventTypes = async () => {
  const res = await api.get(`${API_BASE}/event-types`);
  return res.data;
};
