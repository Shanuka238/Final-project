const UserMessage = require('../models/UserMessage');

exports.createUserMessage = async (req, res) => {
  try {
    const msg = await UserMessage.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUserMessages = async (req, res) => {
  try {
    let filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    } else if (req.query.email) {
      filter.email = req.query.email;
    }
    const messages = await UserMessage.find(filter).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addReplyToUserMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const msg = await UserMessage.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: { content } } },
      { new: true }
    );
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserMessageById = async (req, res) => {
  try {
    const msg = await UserMessage.findById(req.params.id);
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
