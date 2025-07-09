const express = require('express');
const router = express.Router();
const activitiesController = require('../../controllers/user/activitiesController');

router.get('/:userId', activitiesController.getUserActivities);

module.exports = router;
