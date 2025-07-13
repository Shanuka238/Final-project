const express = require('express');
const router = express.Router();
const adminMessagesController = require('../../controllers/admin/adminMessagesController');

router.get('/messages/:staffId', adminMessagesController.getStaffMessages);
router.post('/messages/:staffId', adminMessagesController.postStaffMessage);

module.exports = router;
