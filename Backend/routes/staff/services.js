
const express = require('express');
const router = express.Router();
const servicesController = require('../../controllers/staff/servicesController');
const requireAuth = require('../../middleware/auth');
// Get a single service by ID
router.get('/:serviceId', requireAuth, servicesController.getServiceById);

// Get all services
router.get('/', requireAuth, servicesController.getAllServices);
// Add a service
router.post('/', requireAuth, servicesController.addService);
// Edit a service
router.put('/:serviceId', requireAuth, servicesController.editService);
// Delete a service
router.delete('/:serviceId', requireAuth, servicesController.deleteService);

module.exports = router;
