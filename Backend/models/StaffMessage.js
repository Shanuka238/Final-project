const mongoose = require('mongoose');

const StaffMessageSchema = new mongoose.Schema({
  staffId: { type: String, required: true },
  staffName: { type: String },
  staffEmail: { type: String },
  messages: [
    {
      sender: { type: String, enum: ['admin', 'staff'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('StaffMessage', StaffMessageSchema);
