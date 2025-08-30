const express = require('express');
const router = express.Router();
const packagesController = require('../../controllers/staff/packagesController');

router.post('/', packagesController.addPackage);
router.put('/:packageId', packagesController.editPackage);
router.delete('/:packageId', packagesController.deletePackage);

module.exports = router;
