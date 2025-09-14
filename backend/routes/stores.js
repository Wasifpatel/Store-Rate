const express = require('express');
const router = express.Router();
const { getStoreRatings } = require('../controllers/storeController');
const { protect, storeOwner } = require('../middleware/authMiddleware');

router.get('/:id/ratings', protect, storeOwner, getStoreRatings);

module.exports = router;
