const express = require('express');
const app = express();
const path = require('path');

// Import API routes
const apiRoutes = require('./routes/api');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', apiRoutes);

// ... existing code ...

module.exports = app; 