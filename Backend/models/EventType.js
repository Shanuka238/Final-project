const mongoose = require('mongoose');

const EventTypeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: String,
  icon: String,
  description: String,
  subTypes: [String],
  color: String
});

module.exports = mongoose.model('EventType', EventTypeSchema);
