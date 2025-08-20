const Review = require('../../models/Review');
// Add review for a package
exports.addReviewToPackage = async (req, res) => {
  try {
    const { userPackageId } = req.params;
    const { review, rating } = req.body;
    const userId = req.user.id;

    // Find the user package
    const userPackage = await UserPackage.findById(userPackageId);
    if (!userPackage) {
      return res.status(404).json({ error: 'User package booking not found' });
    }

    // Optionally, check if user has already reviewed this package
    // (not implemented for simplicity)

    // Get user info for review
    const User = require('../../models/User');
    const user = await User.findById(userId);

    // Find the package for title
    const Package = require('../../models/Package');
    const pkg = await Package.findById(userPackage.packageId);

    const newReview = new Review({
      userId,
      userName: user?.username || '',
      userImage: user?.image || '',
      userRole: user?.role || '',
      package: pkg?.title || '',
      review,
      rating
    });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const logActivity = require('../../utils/logActivity');
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
    // Log activity for recent activity tracking
    await logActivity({
      userId,
      type: 'package',
      title: 'Booked a package',
      description: `Booked package: ${packageTitle}`,
      icon: 'Package',
      iconColor: 'text-accent',
      relatedEvent: packageTitle
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

