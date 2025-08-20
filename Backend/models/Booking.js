const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  eventTitle: String,
  package: String,
  guestCount: Number, // Number of guests
  price: Number, // Price for selected number of guests
  totalAmount: Number,
  paidAmount: Number,
  dueAmount: Number,
  status: String,
  bookingDate: String,
  eventDate: String,
  eventTime: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // <-- Added field
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
