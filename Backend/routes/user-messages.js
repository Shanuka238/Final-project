const express = require('express');
const router = express.Router();
const userMessagesController = require('../controllers/userMessagesController');
const auth = require('../middleware/auth');

router.post('/', userMessagesController.createUserMessage);
router.get('/', auth, userMessagesController.getAllUserMessages);
router.post('/:id/reply', userMessagesController.addReplyToUserMessage);
router.get('/:id', userMessagesController.getUserMessageById);

module.exports = router;
