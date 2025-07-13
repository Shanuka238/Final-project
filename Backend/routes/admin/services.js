const express = require('express');
const router = express.Router();
const servicesController = require('../../controllers/admin/servicesController');

// POST /api/admin/services - Add a new service
router.post('/', servicesController.addService);

// GET /api/admin/services - Get all services
router.get('/', servicesController.getServices);

module.exports = router;
