const Package = require('../../models/Package');


exports.addPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.packageId);
    if (!deleted) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editPackage = async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(
      req.params.packageId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
