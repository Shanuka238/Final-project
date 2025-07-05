const express = require('express');
const router = express.Router();
const axios = require('axios');

// MongoDB models
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const Favorite = require('../models/Favorite');
const Package = require('../models/Package');
const Activity = require('../models/Activity');

// Clerk API credentials (use env vars in production)
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
// Dashboard summary stats
router.get('/dashboard-summary', async (req, res) => {
  try {
    // Clerk users
    const usersResponse = await axios.get(`${CLERK_API_BASE}/users`, { headers: clerkHeaders });
    const users = usersResponse.data;
    // Count all Clerk accounts
    const userList = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
    const totalAccounts = userList.length;
    let serviceProviders = userList.filter(u => (u.publicMetadata?.role || u.public_metadata?.role) === 'service-provider').length;

    // MongoDB counts
    const [upcomingEvents, totalBookings, savedPackages, messages] = await Promise.all([
      Event.countDocuments({ date: { $gte: new Date().toISOString().slice(0, 10) } }),
      Booking.countDocuments(),
      Favorite.countDocuments({ type: 'package' }),
      Activity.countDocuments({ type: 'message' })
    ]);

    res.json({
      totalAccounts,
      upcomingEvents,
      totalBookings,
      savedPackages,
      messages,
      serviceProviders
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const CLERK_API_BASE = 'https://api.clerk.com/v1';

const clerkHeaders = {
  Authorization: `Bearer ${CLERK_SECRET_KEY}`,
  'Content-Type': 'application/json',
};

// List all users (for admin dashboard, including staff)
router.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${CLERK_API_BASE}/users`, { headers: clerkHeaders });
    const users = response.data;
    const userList = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create user
router.post('/users', async (req, res) => {
  try {
    const { email, password, username, role, metadata } = req.body;
    // Sanitize username: only alphanumeric and underscores, no spaces
    let finalUsername = username || email.split('@')[0];
    finalUsername = finalUsername.replace(/[^a-zA-Z0-9_]/g, '_');
    // Basic password validation (min 8 chars, at least one letter and one number)
    if (!password || password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and contain both letters and numbers.' });
    }
    // Create the user
    const response = await axios.post(
      `${CLERK_API_BASE}/users`,
      { email_address: [email], password, username: finalUsername },
      { headers: clerkHeaders }
    );
    const userId = response.data.id;
    // Set role and metadata in public_metadata
    if (userId) {
      const public_metadata = { role };
      if (metadata && metadata.staffRole) public_metadata.staffRole = metadata.staffRole;
      await axios.patch(
        `${CLERK_API_BASE}/users/${userId}/metadata`,
        { public_metadata },
        { headers: clerkHeaders }
      );
    }
    // Fetch the updated user
    const updatedUser = await axios.get(`${CLERK_API_BASE}/users/${userId}`, { headers: clerkHeaders });
    res.json(updatedUser.data);
  } catch (err) {
    // Log full error for debugging
    console.error('Clerk user creation error:', err);
    if (err.response && err.response.data) {
      res.status(500).json({ error: err.response.data, message: 'Clerk API error', details: err.response.data });
    } else {
      res.status(500).json({ error: err.message || 'Unknown error', message: 'Server error' });
    }
  }
});

// Delete user
router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.delete(`${CLERK_API_BASE}/users/${userId}`, { headers: clerkHeaders });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
