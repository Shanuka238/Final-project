const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const logActivity = require('../../utils/logActivity');

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
    const event = await Event.create({ ...eventData, userId });
    const booking = await Booking.create({ ...bookingData, userId });
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
    if (booking.dueAmount === 0) booking.status = 'paid';
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
