import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const ejsRoutes = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ejsRoutes.get('/explore-ejs', (req, res) => {
    res.render('explore');
});

export default ejsRoutes;