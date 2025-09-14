const express = require('express');
const router = express.Router();
const { createUser, createStore, getUsers, getStores, getStatistics } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/users', protect, admin, createUser);
router.post('/stores', protect, admin, createStore);
router.get('/users', protect, admin, getUsers);
router.get('/stores', protect, admin, getStores);
router.get('/statistics', protect, admin, getStatistics);

module.exports = router;
