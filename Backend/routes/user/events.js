const express = require('express');
const router = express.Router();
const eventsController = require('../../controllers/user/eventsController');


const auth = require('../../middleware/auth');

router.get('/upcoming/:userId', auth, (req, res, next) => {
  const tokenId = String(req.user.id).trim();
  const paramId = String(req.params.userId).trim();
  if (tokenId !== paramId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  eventsController.getUserUpcomingEvents(req, res, next);
});
router.get('/booked-slots/all', eventsController.getBookedSlots);
router.get('/:userId', auth, (req, res, next) => {
  const tokenId = String(req.user.id).trim();
  const paramId = String(req.params.userId).trim();
  if (tokenId !== paramId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  eventsController.getUserEvents(req, res, next);
});

module.exports = router;
