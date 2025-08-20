const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, 
  description: { type: String },
  imageUrl: { type: String },
  details: { type: String },
  keyFeatures: [{ type: String }],
  photographer: {
    name: { type: String },
    rating: { type: Number, min: 0, max: 5 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);
