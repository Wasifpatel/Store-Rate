const Rating = require('../models/rating');
const { validationResult } = require('express-validator');

exports.addOrUpdateRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  try {
    await Rating.create(user_id, store_id, rating);
    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (err) {
    console.error(err.message);
    // Handle unique constraint violation (user already rated this store)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'You have already rated this store' });
    }
    res.status(500).send('Server error');
  }
};
