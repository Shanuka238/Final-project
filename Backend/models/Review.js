const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  userImage: { type: String },
  userRole: { type: String },
  eventTitle: { type: String },
  package: { type: String },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
