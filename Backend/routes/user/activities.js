const express = require('express');
const router = express.Router();
const activitiesController = require('../../controllers/user/activitiesController');
const auth = require('../../middleware/auth');

// Only allow access if JWT is valid and userId matches token
router.get('/:userId', auth, (req, res, next) => {
  const tokenId = String(req.user.id).trim();
  const paramId = String(req.params.userId).trim();
  if (tokenId !== paramId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  activitiesController.getUserActivities(req, res, next);
});

module.exports = router;
