const express = require('express');
const router = express.Router();
const StaffMessage = require('../models/StaffMessage');

// Get all messages for a staff member
router.get('/messages/:staffId', async (req, res) => {
  try {
    const doc = await StaffMessage.findOne({ staffId: req.params.staffId });
    res.json(doc ? doc.messages : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new message (admin or staff)
router.post('/messages/:staffId', async (req, res) => {
  try {
    const { sender, content } = req.body;
    let doc = await StaffMessage.findOne({ staffId: req.params.staffId });
    if (!doc) {
      doc = await StaffMessage.create({
        staffId: req.params.staffId,
        staffName: req.body.staffName || '',
        staffEmail: req.body.staffEmail || '',
        messages: []
      });
    }
    doc.messages.push({ sender, content });
    await doc.save();
    res.json(doc.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
