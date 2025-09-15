const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Store Rating Platform API', 
    status: 'running'
  });
});

// Database test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const envVars = {
      MYSQLHOST: process.env.MYSQLHOST,
      MYSQLUSER: process.env.MYSQLUSER,
      MYSQLDATABASE: process.env.MYSQLDATABASE,
      MYSQLPORT: process.env.MYSQLPORT
    };
    
    console.log('Environment variables:', envVars);
    
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT || 3306
    });
    
    const [rows] = await connection.execute('SELECT 1 as test');
    await connection.end();
    
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
        MYSQLHOST: process.env.MYSQLHOST,
        MYSQLUSER: process.env.MYSQLUSER,
        MYSQLDATABASE: process.env.MYSQLDATABASE,
        MYSQLPORT: process.env.MYSQLPORT
      }
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    MYSQLHOST: process.env.MYSQLHOST,
    MYSQLUSER: process.env.MYSQLUSER,
    MYSQLDATABASE: process.env.MYSQLDATABASE,
    MYSQLPORT: process.env.MYSQLPORT
  });
});
