const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  sender: { type: String, default: 'admin' },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const UserMessageSchema = new mongoose.Schema({
  userId: { type: String }, 
  name: String,
  email: String,
  phone: String,
  eventType: String,
  contactMethod: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  replies: [ReplySchema]
});

module.exports = mongoose.model('UserMessage', UserMessageSchema);
