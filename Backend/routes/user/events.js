const express = require('express');
const router = express.Router();
const eventsController = require('../../controllers/user/eventsController');

// Order matters: place more specific routes first to avoid conflicts
router.get('/upcoming/:userId', eventsController.getUserUpcomingEvents);
router.get('/booked-slots/all', eventsController.getBookedSlots);
router.get('/:userId', eventsController.getUserEvents);

module.exports = router;
