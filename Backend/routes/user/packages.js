const express = require('express');
const router = express.Router();
const packagesController = require('../../controllers/user/packagesController');

router.get('/', packagesController.getAllPackages);
router.post('/', packagesController.addPackage);
router.delete('/:packageId', packagesController.deletePackage);
router.put('/:packageId', packagesController.editPackage);

module.exports = router;
