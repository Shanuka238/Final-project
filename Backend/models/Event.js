const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  title: String,
  type: String,
  date: String,
  time: String,
  location: String,
  package: String,
  status: String,
  guests: Number,
  planner: String,
  plannerAvatar: String,
  image: String,
  progress: Number,
  nextAction: String,
  daysUntil: Number
});

module.exports = mongoose.model('Event', EventSchema);
