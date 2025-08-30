const Event = require('../../models/Event');
const Booking = require('../../models/Booking');
const Favorite = require('../../models/Favorite');
const Package = require('../../models/Package');
const User = require('../../models/User');

exports.getSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ $or: [ { role: 'user' }, { role: 'staff' } ] });
    const now = new Date();
    const upcomingEvents = await Event.countDocuments({ date: { $gt: now.toISOString().split('T')[0] } });
    const totalBookings = await Booking.countDocuments();
    const savedPackages = await Favorite.countDocuments({ type: 'package' });
    const messages = 0;
    const serviceProviders = await User.countDocuments({ role: 'staff' });
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
