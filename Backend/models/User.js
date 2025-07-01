const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Clerk users
  clerkId: { type: String, unique: true, sparse: true },
  name: { type: String },
  // Add more fields as needed
});

module.exports = mongoose.model('User', userSchema);