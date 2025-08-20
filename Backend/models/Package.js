const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: Number,
  image: String,
  rating: Number,
  reviewCount: Number,
  availability: String,
  features: [String],
  description: String,
  timeline: String,
  isPopular: Boolean,
  isFavorite: Boolean
});

module.exports = mongoose.model('Package', PackageSchema);
