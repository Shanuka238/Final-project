const Favorite = require('../../models/Favorite');

exports.getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addPackageToFavorites = async (req, res) => {
  try {
    const { userId, pkg } = req.body;
    if (!userId || !pkg) return res.status(400).json({ error: 'Missing userId or package' });
    const exists = await Favorite.findOne({ userId, type: 'package', 'data._id': pkg._id });
    if (exists) return res.status(200).json({ message: 'Already in favorites' });
    const favorite = await Favorite.create({ userId, type: 'package', data: pkg, savedDate: new Date().toISOString() });
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;
    await Favorite.findByIdAndDelete(favoriteId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
