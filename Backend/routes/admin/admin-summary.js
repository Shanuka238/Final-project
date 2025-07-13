const express = require('express');
const router = express.Router();
const adminSummaryController = require('../../controllers/admin/adminSummaryController');

router.get('/summary', adminSummaryController.getSummary);

module.exports = router;
