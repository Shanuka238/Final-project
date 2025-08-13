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

// Staff Services API
export const fetchStaffServices = async () => {
  const res = await api.get(`${API_BASE}/staff/services`);
  return res.data;
};

export const fetchStaffService = async (serviceId) => {
  const res = await api.get(`${API_BASE}/staff/services/${serviceId}`);
  return res.data;
};

export const addStaffService = async (service) => {
  const res = await api.post(`${API_BASE}/staff/services`, service);
  return res.data;
};

export const updateStaffService = async (serviceId, service) => {
  const res = await api.put(`${API_BASE}/staff/services/${serviceId}`, service);
  return res.data;
};

export const deleteStaffService = async (serviceId) => {
  const res = await api.delete(`${API_BASE}/staff/services/${serviceId}`);
  return res.data;
};
// Save a review for a booking
export const saveBookingReview = async (bookingId, review, rating) => {
  const res = await api.post(`${API_BASE}/bookings/${bookingId}/review`, { review, rating });
  return res.data;
};
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
  const res = await api.post(`${API_BASE}/staff/packages`, pkg);
  return res.data;
};


export const deletePackage = async (packageId) => {
  const res = await api.delete(`${API_BASE}/staff/packages/${packageId}`);
  return res.data;
};


export const updatePackage = async (packageId, pkg) => {
  const res = await api.put(`${API_BASE}/staff/packages/${packageId}`, pkg);
  return res.data;
};


export const fetchEventTypes = async () => {
  const res = await api.get(`${API_BASE}/event-types`);
  return res.data;
};
