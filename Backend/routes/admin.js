const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');

// === Admin Dashboard & User Management (MongoDB only) ===
router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.delete('/users/:userId', adminController.deleteUser);

// You can add more admin routes here as needed, all MongoDB-based.

module.exports = router;
