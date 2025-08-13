const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../controllers/user/usersController');
const auth = require('../../middleware/auth');

// GET /api/admin/users?role=user|staff|admin
router.get('/', auth, getAllUsers);

module.exports = router;
