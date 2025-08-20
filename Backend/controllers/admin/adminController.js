const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const Favorite = require('../../models/Favorite');
const Package = require('../../models/Package');
const Activity = require('../../models/Activity');

exports.getDashboardSummary = async (req, res) => {
  try {
    const User = require('../../models/User');
    const users = await User.find({}, '-password');
    const totalAccounts = users.filter(u => u.role === 'user' || u.role === 'staff').length;
    const serviceProviders = users.filter(u => u.role === 'staff').length;
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
    const User = require('../../models/User');
    const users = await User.find({}, '-password'); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const User = require('../../models/User');
    const { email, password, username, role } = req.body;
    let finalUsername = username || email.split('@')[0];
    finalUsername = finalUsername.replace(/[^a-zA-Z0-9_]/g, '_');
    if (!password || password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and contain both letters and numbers.' });
    }
    const newUser = new User({
      email,
      password,
      username: finalUsername,
      role: role || 'staff'
    });
    await newUser.save();
    res.json({ success: true, user: { _id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role, createdAt: newUser.createdAt } });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error', message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const User = require('../../models/User');
    const { userId } = req.params;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, userId });
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
