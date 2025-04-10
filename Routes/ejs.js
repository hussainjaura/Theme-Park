import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../database/database.js';
const ejsRoutes = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


ejsRoutes.get('/explore-ejs/:id', (req, res) => {
    const exploreId = req.params.id;
    db.get('SELECT * FROM explore WHERE id = ?', [exploreId], (err, row) => {
        if (err) {
            console.error('Error fetching ride:', err);
            res.status(500).send('Error fetching ride');
        } else {
            res.render('explore', { explore: [row] });
        }
    });
});

ejsRoutes.get('/rides-ejs/:id', (req, res) => {
    const rideId = req.params.id;
    db.get('SELECT * FROM rides WHERE id = ?', [rideId], (err, row) => {
        if (err) {
            console.error('Error fetching ride:', err);
            res.status(500).send('Error fetching ride');
        } else {
            res.render('rides', { rides: [row] });
        }
    });
});

ejsRoutes.get('/api/search', (req, res) => {
    const search = req.query.q;
    console.log(search);
    console.log(req.query);

    db.all('SELECT * FROM rides WHERE title LIKE ?', [`%${search}%`], (err, rows) => {
        if (err) {
            console.error('Error searching rides:', err);
            return res.status(500).json({ error: 'Database ran into an error' });
        }

        res.json(rows); // Send JSON, not rendered HTML
    });
});


export default ejsRoutes;