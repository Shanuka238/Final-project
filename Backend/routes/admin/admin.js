const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const auth = require('../../middleware/auth');

// Dashboard summary stats
router.get('/dashboard-summary', auth, adminController.getDashboardSummary);
// List all users
router.get('/users', auth, adminController.getAllUsers);
// Create user (admin/staff/user)
router.post('/users', auth, adminController.createUser);
// Delete user
router.delete('/users/:userId', auth, adminController.deleteUser);

router.get('/events', auth, adminController.getAllEvents);
router.get('/bookings', auth, adminController.getAllBookings);
router.get('/packages', auth, adminController.getAllPackages);

module.exports = router;
