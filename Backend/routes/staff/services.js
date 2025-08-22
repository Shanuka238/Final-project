const express = require('express');
const router = express.Router();
const servicesController = require('../../controllers/staff/servicesController');
const requireAuth = require('../../middleware/auth');

router.get('/:serviceId', requireAuth, servicesController.getServiceById);
router.get('/', requireAuth, servicesController.getAllServices);
router.post('/', requireAuth, servicesController.addService);
router.put('/:serviceId', requireAuth, servicesController.editService);
router.delete('/:serviceId', requireAuth, servicesController.deleteService);

module.exports = router;
