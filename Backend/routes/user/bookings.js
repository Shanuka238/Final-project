const express = require('express');
const router = express.Router();
const bookingsController = require('../../controllers/user/bookingsController');
const auth = require('../../middleware/auth');

router.get('/all-reviews', bookingsController.getAllReviews);
router.get('/stored-reviews', bookingsController.getAllStoredReviews);

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

router.post('/:bookingId/review', auth, bookingsController.addReviewToBooking);

module.exports = router;
