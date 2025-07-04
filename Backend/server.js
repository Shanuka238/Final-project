const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/partynest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
