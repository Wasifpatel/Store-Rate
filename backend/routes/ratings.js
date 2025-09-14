const express = require('express');
const router = express.Router();
const { addOrUpdateRating } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.post(
  '/',
  [
    protect,
    check('store_id', 'Store ID is required').not().isEmpty(),
    check('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 })
  ],
  addOrUpdateRating
);

module.exports = router;
