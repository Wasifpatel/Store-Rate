const Store = require('../models/store');

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
