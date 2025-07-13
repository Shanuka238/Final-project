// Delete a user package booking
exports.deleteUserPackage = async (req, res) => {
  try {
    const { userPackageId } = req.params;
    const deleted = await UserPackage.findByIdAndDelete(userPackageId);
    if (!deleted) {
      return res.status(404).json({ error: 'User package booking not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Pay for a user package booking
exports.payUserPackage = async (req, res) => {
  try {
    const { userPackageId } = req.params;
    const { amount, paymentIntentId } = req.body;
    // Optionally, validate amount/paymentIntentId here
    const userPackage = await UserPackage.findById(userPackageId);
    if (!userPackage) {
      return res.status(404).json({ error: 'User package booking not found' });
    }
    // Increment paidAmount for partial payments
    if (amount) {
      userPackage.paidAmount = (userPackage.paidAmount || 0) + Number(amount);
    }
    if (userPackage.paidAmount >= userPackage.price) {
      userPackage.status = 'paid';
    } else {
      userPackage.status = 'partial';
    }
    if (paymentIntentId) userPackage.paymentIntentId = paymentIntentId;
    await userPackage.save();
    res.json(userPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const UserPackage = require('../../models/UserPackage');

// Book a package for a user
exports.bookUserPackage = async (req, res) => {
  try {
    const { userId, packageId, packageTitle, eventDate, eventTime, guestCount, price } = req.body;
    const userPackage = await UserPackage.create({
      userId,
      packageId,
      packageTitle,
      eventDate,
      eventTime,
      guestCount,
      price
    });
    res.status(201).json(userPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all booked packages for a user, with image and price from Package
exports.getUserPackages = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPackages = await UserPackage.find({ userId });
    // Fetch all related packages in one go
    const packageIds = userPackages.map(up => up.packageId);
    const packages = await Package.find({ _id: { $in: packageIds } });
    // Map packageId to package data
    const packageMap = {};
    packages.forEach(pkg => { packageMap[pkg._id] = pkg; });
    // Attach image and priceRange to each user package
    const result = userPackages.map(up => {
      const pkg = packageMap[up.packageId];
      return {
        ...up.toObject(),
        image: pkg?.image || '',
        priceRange: pkg?.priceRange || '',
      };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const Package = require('../../models/Package');

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
