const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');

// Dashboard summary stats
router.get('/dashboard-summary', adminController.getDashboardSummary);
// List all users
router.get('/users', adminController.getAllUsers);
// Create user
router.post('/users', adminController.createUser);
// Delete user
router.delete('/users/:userId', adminController.deleteUser);
// Get all events
router.get('/events', adminController.getAllEvents);
// Get all bookings
router.get('/bookings', adminController.getAllBookings);
// Get all packages
router.get('/packages', adminController.getAllPackages);

module.exports = router;
