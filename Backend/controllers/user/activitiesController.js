const Activity = require('../../models/Activity');

exports.getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
