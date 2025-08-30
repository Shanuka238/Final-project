const express = require('express');
const router = express.Router();
const eventTypesController = require('../../controllers/user/eventTypesController');

router.get('/', eventTypesController.getAllEventTypes);

module.exports = router;
