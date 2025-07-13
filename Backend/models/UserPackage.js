const mongoose = require('mongoose');

const UserPackageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  packageId: { type: String, required: true },
  packageTitle: String,
  eventDate: String,
  eventTime: String,
  guestCount: Number,
  price: Number,
  status: { type: String, default: 'Booked' },
  paidAmount: { type: Number, default: 0 },
  paymentIntentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserPackage', UserPackageSchema);
