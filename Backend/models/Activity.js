const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  type: String,
  title: String,
  description: String,
  timestamp: Date,
  icon: String,
  iconColor: String,
  iconBg: String,
  relatedEvent: String,
  actionBy: {
    name: String,
    role: String,
  },
  amount: Number
});

module.exports = mongoose.model('Activity', ActivitySchema);
