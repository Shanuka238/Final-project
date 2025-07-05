const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const Favorite = require('../models/Favorite');
const Package = require('../models/Package');

// Clerk API for user count
const axios = require('axios');
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_API_BASE = 'https://api.clerk.com/v1';

router.get('/summary', async (req, res) => {
  try {
    // Total Users (from Clerk)
    let totalUsers = 0;
    try {
      const response = await axios.get(`${CLERK_API_BASE}/users?limit=1`, {
        headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}` }
      });
      totalUsers = response.data.total_count || 0;
    } catch (e) {
      totalUsers = 0;
    }

    // Upcoming Events (future date)
    const now = new Date();
    const upcomingEvents = await Event.countDocuments({ date: { $gt: now.toISOString().split('T')[0] } });

    // Total Bookings
    const totalBookings = await Booking.countDocuments();

    // Saved Packages (Favorites of type 'package')
    const savedPackages = await Favorite.countDocuments({ type: 'package' });

    // Messages (not implemented, return 0 or implement if you have a model)
    const messages = 0;

    // Service Providers (users with role 'staff' in Clerk)
    let serviceProviders = 0;
    try {
      const response = await axios.get(`${CLERK_API_BASE}/users?limit=100`, {
        headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}` }
      });
      const users = response.data.data || [];
      serviceProviders = users.filter(u => (u.public_metadata?.role || u.publicMetadata?.role) === 'staff').length;
    } catch (e) {
      serviceProviders = 0;
    }

    res.json({
      totalUsers,
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

module.exports = router;
