const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Event = require('./models/Event');
const Booking = require('./models/Booking');
const Favorite = require('./models/Favorite');
const Activity = require('./models/Activity');
const Package = require('./models/Package');
const EventType = require('./models/EventType');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Fp:0x800@finalproject.cicv4nv.mongodb.net/?retryWrites=true&w=majority&appName=Finalproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper to log user activity
async function logActivity({ userId, type, title, description, icon, iconColor, iconBg, relatedEvent, actionBy, amount }) {
  const Activity = require('./models/Activity');
  await Activity.create({
    userId,
    type,
    title,
    description,
    timestamp: new Date(),
    icon,
    iconColor,
    iconBg,
    relatedEvent,
    actionBy,
    amount
  });
}

// API: Get events for a user
app.get('/api/events/:userId', async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get bookings for a user
app.get('/api/bookings/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get favorites for a user
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get recent activities for a user
app.get('/api/activities/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get all event packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get all event types
app.get('/api/event-types', async (req, res) => {
  try {
    const eventTypes = await EventType.find();
    res.json(eventTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Book an event (create booking and event)
app.post('/api/book-event', async (req, res) => {
  try {
    const { userId, eventData, bookingData } = req.body;
    // Save event
    const event = await Event.create({ ...eventData, userId });
    // Save booking
    const booking = await Booking.create({ ...bookingData, userId });
    // Log activity
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
});

// API: Get all bookings for a user
app.get('/api/user-bookings/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get upcoming events for a user (future dates)
app.get('/api/user-upcoming-events/:userId', async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ userId: req.params.userId });
    const upcoming = events.filter(e => {
      if (!e.date) return false;
      const eventDate = new Date(e.date);
      return eventDate > now;
    });
    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get all booked event slots (date and time)
app.get('/api/booked-slots', async (req, res) => {
  try {
    const events = await Event.find({}, 'date time');
    // Return array of { date, time }
    res.json(events.map(e => ({ date: e.date, time: e.time })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Delete a booking and its event
app.delete('/api/booking/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    // Try to delete the associated event by userId, eventDate, eventTitle, and time
    const eventDeleteResult = await Event.deleteOne({
      userId: booking.userId,
      date: booking.eventDate,
      title: booking.eventTitle,
      time: booking.eventTime // Add this if you store time in booking
    });
    if (eventDeleteResult.deletedCount === 0) {
      // Try again without time if not found
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
});

// Stripe payment intent endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'lkr', metadata = {} } = req.body;
    // Stripe expects amount in the smallest currency unit (cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // amount should be in LKR cents
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Pay booking (update paidAmount and dueAmount)
app.patch('/api/booking/:bookingId/pay', async (req, res) => {
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
});

// API: Add package to favorites
app.post('/api/favorites/package', async (req, res) => {
  try {
    const { userId, pkg } = req.body;
    if (!userId || !pkg) return res.status(400).json({ error: 'Missing userId or package' });
    // Prevent duplicate favorite
    const exists = await Favorite.findOne({ userId, type: 'package', 'data._id': pkg._id });
    if (exists) return res.status(200).json({ message: 'Already in favorites' });
    const favorite = await Favorite.create({ userId, type: 'package', data: pkg, savedDate: new Date().toISOString() });
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Remove favorite by _id
app.delete('/api/favorites/:favoriteId', async (req, res) => {
  try {
    const { favoriteId } = req.params;
    await Favorite.findByIdAndDelete(favoriteId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Add a new event package
app.post('/api/packages', async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Delete a package by ID
app.delete('/api/packages/:packageId', async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.packageId);
    if (!deleted) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Edit a package by ID
app.put('/api/packages/:packageId', async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(
      req.params.packageId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin', require('./routes/admin-messages'));
app.use('/api/user-messages', require('./routes/user-messages'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
