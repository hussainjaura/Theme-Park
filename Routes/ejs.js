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

export default ejsRoutes;