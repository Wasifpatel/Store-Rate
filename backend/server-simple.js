const express = require('express');
const cors = require('cors');

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

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

// Add process error handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
