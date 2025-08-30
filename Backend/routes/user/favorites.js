const express = require('express');
const router = express.Router();
const favoritesController = require('../../controllers/user/favoritesController');
const auth = require('../../middleware/auth');

router.get('/:userId', auth, (req, res, next) => {
  const tokenId = String(req.user.id).trim();
  const paramId = String(req.params.userId).trim();
  if (tokenId !== paramId) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  favoritesController.getUserFavorites(req, res, next);
});
router.post('/package', auth, favoritesController.addPackageToFavorites);
router.delete('/:favoriteId', auth, favoritesController.removeFavorite);

module.exports = router;
