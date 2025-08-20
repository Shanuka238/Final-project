const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  eventTitle: String,
  package: String,
  guestCount: Number, 
  price: Number, 
  totalAmount: Number,
  paidAmount: Number,
  dueAmount: Number,
  status: String,
  bookingDate: String,
  eventDate: String,
  eventTime: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], 
  paymentSchedule: [
    {
      description: String,
      amount: Number,
      dueDate: String,
      status: String
    }
  ],
  documents: [
    {
      name: String,
      status: String,
      uploadDate: String
    }
  ],
  reviews: [
    {
      userId: String,
      review: String,
      rating: Number,
      date: String
    }
  ]
});

module.exports = mongoose.model('Booking', BookingSchema);
