const express = require('express');
const router = express.Router();
const bookingsController = require('../../controllers/user/bookingsController');
const auth = require('../../middleware/auth');
// Get all reviews from all bookings (legacy, not used for testimonials)
router.get('/all-reviews', bookingsController.getAllReviews);
// Get all reviews from the new Review collection (for testimonials)
router.get('/stored-reviews', bookingsController.getAllStoredReviews);

// Only allow access if JWT is valid and userId matches token
router.get('/:userId', auth, (req, res, next) => {
  const tokenId = String(req.user.id).trim();
  const paramId = String(req.params.userId).trim();
  if (tokenId !== paramId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  bookingsController.getUserBookings(req, res, next);
});
router.post('/book-event', auth, bookingsController.bookEvent);
router.delete('/:bookingId', auth, bookingsController.deleteBooking);
router.patch('/:bookingId/pay', auth, bookingsController.payBooking);

// Add review to booking
router.post('/:bookingId/review', auth, bookingsController.addReviewToBooking);

module.exports = router;
