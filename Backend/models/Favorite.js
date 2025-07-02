const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  type: { type: String, enum: ['package', 'venue'], required: true },
  data: { type: Object, required: true }, // Store package or venue info
  savedDate: String
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
