const express = require('express');
const router = express.Router();
const favoritesController = require('../../controllers/user/favoritesController');

router.get('/:userId', favoritesController.getUserFavorites);
router.post('/package', favoritesController.addPackageToFavorites);
router.delete('/:favoriteId', favoritesController.removeFavorite);

module.exports = router;
