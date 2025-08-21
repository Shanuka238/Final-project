const express = require('express');
const router = express.Router();
const packagesController = require('../../controllers/user/packagesController');
const requireAuth = require('../../middleware/auth');

router.delete('/user-booking/:userPackageId', requireAuth, packagesController.deleteUserPackage);
router.post('/:userPackageId/review', requireAuth, packagesController.addReviewToPackage);
router.patch('/user-booking/:userPackageId/pay', packagesController.payUserPackage);

router.get('/', packagesController.getAllPackages);

router.post('/book', packagesController.bookUserPackage);
router.get('/user/:userId', requireAuth, packagesController.getUserPackages);

module.exports = router;
