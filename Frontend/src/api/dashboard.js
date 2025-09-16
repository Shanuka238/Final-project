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

export const fetchEventTypes = async () => {
  const res = await api.get(`${API_BASE}/event-types`);
  return res.data;
};


export const saveBookingReview = async (bookingId, review, rating) => {
  const res = await api.post(`${API_BASE}/bookings/${bookingId}/review`, { review, rating });
  return res.data;
};

export const bookUserPackage = async (userId, packageData) => {
  const res = await api.post(`${API_BASE}/packages/book`, { userId, ...packageData });
  return res.data;
};

export const fetchUserPackages = async (userId) => {
  const res = await api.get(`${API_BASE}/packages/user/${userId}`);
  return res.data;
};

export const deleteBooking = async (bookingId) => {
  const res = await api.delete(`${API_BASE}/bookings/${bookingId}`);
  return res.data;
};

export const payBooking = async (bookingId, amount, paymentIntentId) => {
  const res = await api.patch(`${API_BASE}/bookings/${bookingId}/pay`, { amount, paymentIntentId });
  return res.data;
};

export const bookEvent = async (userId, eventData, bookingData) => {
  const res = await api.post(`${API_BASE}/bookings/book-event`, { userId, eventData, bookingData });
  return res.data;
};

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

export const deleteUserPackage = async (userPackageId) => {
  const res = await api.delete(`${API_BASE}/packages/user-booking/${userPackageId}`);
  return res.data;
};

export const payUserPackage = async (userPackageId, amount, paymentIntentId) => {
  const res = await api.patch(`${API_BASE}/packages/user-booking/${userPackageId}/pay`, { amount, paymentIntentId });
  return res.data;
};

export const submitPackageReview = async (userPackageId, review, rating) => {
  const res = await api.post(`${API_BASE}/packages/${userPackageId}/review`, { review, rating });
  return res.data;
};


