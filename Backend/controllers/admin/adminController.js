const axios = require('axios');
const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const Favorite = require('../../models/Favorite');
const Package = require('../../models/Package');
const Activity = require('../../models/Activity');

const CLERK_API_BASE = 'https://api.clerk.com/v1';
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const clerkHeaders = {
  Authorization: `Bearer ${CLERK_SECRET_KEY}`,
  'Content-Type': 'application/json',
};

exports.getDashboardSummary = async (req, res) => {
  try {
    const usersResponse = await axios.get(`${CLERK_API_BASE}/users`, { headers: clerkHeaders });
    const users = usersResponse.data;
    const userList = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
    const totalAccounts = userList.length;
    let serviceProviders = userList.filter(u => (u.publicMetadata?.role || u.public_metadata?.role) === 'service-provider').length;
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
};

exports.getAllUsers = async (req, res) => {
  try {
    const response = await axios.get(`${CLERK_API_BASE}/users`, { headers: clerkHeaders });
    const users = response.data;
    const userList = Array.isArray(users) ? users : (Array.isArray(users.data) ? users.data : []);
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, username, role, metadata } = req.body;
    let finalUsername = username || email.split('@')[0];
    finalUsername = finalUsername.replace(/[^a-zA-Z0-9_]/g, '_');
    if (!password || password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and contain both letters and numbers.' });
    }
    const response = await axios.post(
      `${CLERK_API_BASE}/users`,
      { email_address: [email], password, username: finalUsername },
      { headers: clerkHeaders }
    );
    const userId = response.data.id;
    if (userId) {
      const public_metadata = { role };
      if (metadata && metadata.staffRole) public_metadata.staffRole = metadata.staffRole;
      await axios.patch(
        `${CLERK_API_BASE}/users/${userId}/metadata`,
        { public_metadata },
        { headers: clerkHeaders }
      );
    }
    const updatedUser = await axios.get(`${CLERK_API_BASE}/users/${userId}`, { headers: clerkHeaders });
    res.json(updatedUser.data);
  } catch (err) {
    console.error('Clerk user creation error:', err);
    if (err.response && err.response.data) {
      res.status(500).json({ error: err.response.data, message: 'Clerk API error', details: err.response.data });
    } else {
      res.status(500).json({ error: err.message || 'Unknown error', message: 'Server error' });
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.delete(`${CLERK_API_BASE}/users/${userId}`, { headers: clerkHeaders });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
