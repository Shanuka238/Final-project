const express = require('express');
const { ObjectId } = require('mongodb');
const User = require('../models/User');

const router = express.Router();

// Get user dashboard
router.get('/user-dashboard/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      name: user.name,
      email: user.email,
      dashboardDetails: user.dashboardDetails,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Register or upsert Clerk user route
router.post('/register', async (req, res) => {
  try {
    const { email, clerkId, name } = req.body;
    if (!email || !clerkId) {
      return res.status(400).json({ error: 'email and clerkId are required' });
    }
    const user = await User.findOneAndUpdate(
      { clerkId },
      { email, name, clerkId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json({ message: 'User saved', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;