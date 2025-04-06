const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all rides
router.get('/all-rides', async (req, res) => {
    try {
        const [rides] = await db.query('SELECT * FROM rides');
        res.json(rides);
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search rides
router.get('/search-rides', async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const [rides] = await db.query(
            'SELECT * FROM rides WHERE name LIKE ? OR description LIKE ?',
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        res.json(rides);
    } catch (error) {
        console.error('Error searching rides:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 