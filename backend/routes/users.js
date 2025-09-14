const express = require('express');
const router = express.Router();
const { getStores } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stores', protect, getStores);

module.exports = router;
