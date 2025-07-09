const express = require('express');
const router = express.Router();
const bookingsController = require('../../controllers/user/bookingsController');

router.get('/:userId', bookingsController.getUserBookings);
router.post('/book-event', bookingsController.bookEvent);
router.delete('/:bookingId', bookingsController.deleteBooking);
router.patch('/:bookingId/pay', bookingsController.payBooking);

module.exports = router;
