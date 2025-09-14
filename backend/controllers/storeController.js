const Store = require('../models/store');
const Rating = require('../models/rating');

exports.getStoreRatings = async (req, res) => {
  try {
    // First, check if the user is the owner of the store
    const store = await Store.findById(req.params.id);

    if (store.owner_id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const ratings = await Rating.findByStoreId(req.params.id);
    const averageRating = await Rating.getAverageRating(req.params.id);

    res.json({ ratings, averageRating });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
