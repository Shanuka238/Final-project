const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const auth = require('../../middleware/auth');

// === Admin Dashboard & User Management (MongoDB only) ===
// Dashboard summary stats
router.get('/dashboard-summary', auth, adminController.getDashboardSummary);
// List all users
router.get('/users', auth, adminController.getAllUsers);
// Create user (admin/staff/user)
router.post('/users', auth, adminController.createUser);
// Delete user
router.delete('/users/:userId', auth, adminController.deleteUser);

// === Event, Booking, and Package Management ===
router.get('/events', auth, adminController.getAllEvents);
router.get('/bookings', auth, adminController.getAllBookings);
router.get('/packages', auth, adminController.getAllPackages);

// No Clerk routes remain. All endpoints use MongoDB.

module.exports = router;
