const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');
const storeRoutes = require('../routes/stores');
const ratingRoutes = require('../routes/ratings');
const adminRoutes = require('../routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;
