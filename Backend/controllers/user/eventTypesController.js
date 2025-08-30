const EventType = require('../../models/EventType');

exports.getAllEventTypes = async (req, res) => {
  try {
    const eventTypes = await EventType.find();
    res.json(eventTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
