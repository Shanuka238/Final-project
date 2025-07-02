const express = require('express');
const router = express.Router();
const axios = require('axios');

// Clerk API credentials (use env vars in production)
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_API_BASE = 'https://api.clerk.com/v1';

const clerkHeaders = {
  Authorization: `Bearer ${CLERK_SECRET_KEY}`,
  'Content-Type': 'application/json',
};

// List users
router.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${CLERK_API_BASE}/users`, { headers: clerkHeaders });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create user
router.post('/users', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const finalUsername = username || email.split('@')[0];
    const response = await axios.post(
      `${CLERK_API_BASE}/users`,
      { email_address: [email], password, username: finalUsername },
      { headers: clerkHeaders }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Clerk user creation error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Delete user
router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.delete(`${CLERK_API_BASE}/users/${userId}`, { headers: clerkHeaders });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
