const express = require('express');
const router = express.Router();
const packagesController = require('../../controllers/staff/packagesController');

// Add a package
router.post('/', packagesController.addPackage);
// Edit a package
router.put('/:packageId', packagesController.editPackage);
// Delete a package
router.delete('/:packageId', packagesController.deletePackage);

module.exports = router;
