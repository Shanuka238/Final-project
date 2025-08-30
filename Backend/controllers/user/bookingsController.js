const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const logActivity = require('../../utils/logActivity');
exports.addReviewToBooking = async (req, res) => {
  try {
    const { review, rating } = req.body;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (!booking.reviews) booking.reviews = [];
    booking.reviews.push({
      userId: req.user.id,
      review,
      rating,
      date: new Date().toISOString()
    });
    await booking.save();

    const User = require('../../models/User');
    const Review = require('../../models/Review');
    const user = await User.findById(req.user.id);
    await Review.create({
      userId: req.user.id,
      userName: user?.username || '',
      userImage: '',
      userRole: user?.role || '',
      eventTitle: booking.eventTitle,
      package: booking.package,
      review,
      rating,
      date: new Date()
    });

    res.json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bookEvent = async (req, res) => {
  try {
  const { userId, eventData, bookingData } = req.body;
  const services = bookingData.services || [];
  const event = await Event.create({ ...eventData, userId });
  const booking = await Booking.create({ ...bookingData, userId, services });
    await logActivity({
      userId,
      type: 'booking',
      title: 'Booked an event',
      description: `Booked event: ${eventData.title} on ${eventData.date}`,
      icon: 'CalendarCheck',
      iconColor: 'text-success',
      relatedEvent: eventData.title
    });
    res.json({ event, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const eventDeleteResult = await Event.deleteOne({
      userId: booking.userId,
      date: booking.eventDate,
      title: booking.eventTitle,
      time: booking.eventTime
    });
    if (eventDeleteResult.deletedCount === 0) {
      await Event.deleteOne({
        userId: booking.userId,
        date: booking.eventDate,
        title: booking.eventTitle
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.payBooking = async (req, res) => {
  try {
    const { amount } = req.body;
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    booking.paidAmount = (booking.paidAmount || 0) + amount;
    booking.dueAmount = Math.max((booking.totalAmount || 0) - booking.paidAmount, 0);
    if (booking.dueAmount === 0) {
      booking.status = 'paid';
    } else if (booking.paidAmount > 0) {
      booking.status = 'partial';
    }
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStoredReviews = async (req, res) => {
  try {
    const Review = require('../../models/Review');
    const reviews = await Review.find({}).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const bookings = await Booking.find({}, 'reviews eventTitle package userId');
    const userIds = [
      ...new Set(
        bookings.flatMap(booking => (booking.reviews || []).map(r => r.userId))
      )
    ];
    const User = require('../../models/User');
    const users = await User.find({ _id: { $in: userIds } }, 'username role');
    const userMap = {};
    users.forEach(u => {
      userMap[String(u._id)] = u;
    });

    const allReviews = bookings.flatMap(booking =>
      (booking.reviews || []).map(r => ({
        ...r,
        eventTitle: booking.eventTitle,
        package: booking.package,
        userId: booking.userId,
        userName: userMap[r.userId]?.username || '',
        userImage: '',
        userRole: userMap[r.userId]?.role || ''
      }))
    );
    res.json(allReviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
