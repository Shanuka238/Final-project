const Event = require('../../models/Event');
const Booking = require('../../models/Booking');
const Favorite = require('../../models/Favorite');
const Package = require('../../models/Package');
const axios = require('axios');
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_API_BASE = 'https://api.clerk.com/v1';

exports.getSummary = async (req, res) => {
  try {
    let totalUsers = 0;
    try {
      const response = await axios.get(`${CLERK_API_BASE}/users?limit=1`, {
        headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}` }
      });
      totalUsers = response.data.total_count || 0;
    } catch (e) {
      totalUsers = 0;
    }
    const now = new Date();
    const upcomingEvents = await Event.countDocuments({ date: { $gt: now.toISOString().split('T')[0] } });
    const totalBookings = await Booking.countDocuments();
    const savedPackages = await Favorite.countDocuments({ type: 'package' });
    const messages = 0;
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
};
