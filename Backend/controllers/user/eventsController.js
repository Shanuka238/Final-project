const Event = require('../../models/Event');

exports.getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ userId: req.params.userId });
    const upcoming = events.filter(e => {
      if (!e.date) return false;
      const eventDate = new Date(e.date);
      return eventDate > now;
    });
    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookedSlots = async (req, res) => {
  try {
    const events = await Event.find({}, 'date time');
    res.json(events.map(e => ({ date: e.date, time: e.time })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
