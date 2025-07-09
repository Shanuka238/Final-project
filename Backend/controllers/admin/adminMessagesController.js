const StaffMessage = require('../../models/StaffMessage');

exports.getStaffMessages = async (req, res) => {
  try {
    const doc = await StaffMessage.findOne({ staffId: req.params.staffId });
    res.json(doc ? doc.messages : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postStaffMessage = async (req, res) => {
  try {
    const { sender, content } = req.body;
    let doc = await StaffMessage.findOne({ staffId: req.params.staffId });
    if (!doc) {
      doc = await StaffMessage.create({
        staffId: req.params.staffId,
        staffName: req.body.staffName || '',
        staffEmail: req.body.staffEmail || '',
        messages: []
      });
    }
    doc.messages.push({ sender, content });
    await doc.save();
    res.json(doc.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
