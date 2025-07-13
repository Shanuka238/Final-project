// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// Update user profile (username, email, password, avatar)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, password, avatar } = req.body;
    const update = {};
    if (username) update.username = username;
    if (email) update.email = email;
    if (typeof avatar !== 'undefined') update.avatar = avatar;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }
    const user = await User.findByIdAndUpdate(userId, update, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Don't return password
    const userObj = user.toObject();
    delete userObj.password;
    res.json(userObj);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
