const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../../controllers/user/profileController');
const auth = require('../../middleware/auth');

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);

module.exports = router;
