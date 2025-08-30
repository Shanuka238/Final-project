const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  type: { type: String, enum: ['package', 'venue'], required: true },
  data: { type: Object, required: true }, 
  savedDate: String
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
