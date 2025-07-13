const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../../controllers/user/profileController');
const auth = require('../../middleware/auth');


// GET /api/user/profile
router.get('/', auth, getProfile);

// PUT /api/user/profile
router.put('/', auth, updateProfile);

module.exports = router;
