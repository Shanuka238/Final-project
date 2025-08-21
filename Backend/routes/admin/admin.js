const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const auth = require('../../middleware/auth');

router.get('/dashboard-summary', auth, adminController.getDashboardSummary);
router.get('/users', auth, adminController.getAllUsers);
router.post('/users', auth, adminController.createUser);
router.delete('/users/:userId', auth, adminController.deleteUser);

router.get('/events', auth, adminController.getAllEvents);
router.get('/bookings', auth, adminController.getAllBookings);
router.get('/packages', auth, adminController.getAllPackages);

module.exports = router;
