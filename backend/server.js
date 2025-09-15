const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Add error handling for route imports
let authRoutes, userRoutes, storeRoutes, ratingRoutes, adminRoutes;

try {
  authRoutes = require('./routes/auth');
  userRoutes = require('./routes/users');
  storeRoutes = require('./routes/stores');
  ratingRoutes = require('./routes/ratings');
  adminRoutes = require('./routes/admin');
  console.log('All routes loaded successfully');
} catch (error) {
  console.error('Error loading routes:', error);
  process.exit(1);
}

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-app.vercel.app' // Replace with your actual Vercel URL
  ],
  credentials: true
}));
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

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Store Rating Platform API', 
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      stores: '/api/stores',
      ratings: '/api/ratings',
      admin: '/api/admin'
    }
  });
});

// Database test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    // Debug environment variables
    const envVars = {
      DB_HOST: process.env.DB_HOST,
      MYSQLHOST: process.env.MYSQLHOST,
      DB_USER: process.env.DB_USER,
      MYSQLUSER: process.env.MYSQLUSER,
      DB_NAME: process.env.DB_NAME,
      MYSQLDATABASE: process.env.MYSQLDATABASE,
      MYSQLPORT: process.env.MYSQLPORT
    };
    
    console.log('Environment variables:', envVars);
    
    const pool = require('./config/db');
    console.log('Database pool created successfully');
    
    const [rows] = await pool.execute('SELECT 1 as test');
    console.log('Database query executed successfully');
    
    res.json({ 
      status: 'success', 
      message: 'Database connected successfully',
      test: rows[0],
      envVars: envVars
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error.message,
      envVars: {
        DB_HOST: process.env.DB_HOST,
        MYSQLHOST: process.env.MYSQLHOST,
        DB_USER: process.env.DB_USER,
        MYSQLUSER: process.env.MYSQLUSER,
        DB_NAME: process.env.DB_NAME,
        MYSQLDATABASE: process.env.MYSQLDATABASE,
        MYSQLPORT: process.env.MYSQLPORT
      }
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
