const express = require('express');
const router = express.Router();
const UserMessage = require('../models/UserMessage');

// POST: Save a new user message
router.post('/', async (req, res) => {
  try {
    const msg = await UserMessage.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get all user messages
router.get('/', async (req, res) => {
  try {
    const messages = await UserMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add a reply to a user message
router.post('/:id/reply', async (req, res) => {
  try {
    const { content } = req.body;
    const msg = await UserMessage.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: { content } } },
      { new: true }
    );
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get a single user message by ID
router.get('/:id', async (req, res) => {
  try {
    const msg = await UserMessage.findById(req.params.id);
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
