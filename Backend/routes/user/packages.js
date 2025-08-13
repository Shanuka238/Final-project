

const express = require('express');
const router = express.Router();
const packagesController = require('../../controllers/user/packagesController');
const requireAuth = require('../../middleware/auth');

// Delete a user package booking
router.delete('/user-booking/:userPackageId', requireAuth, packagesController.deleteUserPackage);

// Pay for a user package booking
router.patch('/user-booking/:userPackageId/pay', packagesController.payUserPackage);


// Public package routes
router.get('/', packagesController.getAllPackages);

// User package booking routes
router.post('/book', packagesController.bookUserPackage);
router.get('/user/:userId', requireAuth, packagesController.getUserPackages);

module.exports = router;
