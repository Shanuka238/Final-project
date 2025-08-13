// This file is deprecated. Use routes/user-messages.js with controllers/userMessagesController.js instead.

const express = require('express');
const router = express.Router();
const userMessagesController = require('../controllers/userMessagesController');
const auth = require('../middleware/auth');

// POST: Save a new user message
router.post('/', userMessagesController.createUserMessage);

// GET: Get all user messages (protected)
router.get('/', auth, userMessagesController.getAllUserMessages);

// POST: Add a reply to a user message
router.post('/:id/reply', userMessagesController.addReplyToUserMessage);

// GET: Get a single user message by ID
router.get('/:id', userMessagesController.getUserMessageById);

module.exports = router;
