import sqlite from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'theme.db');

sqlite.verbose();

const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the theme database for ride and attraction data');
    }
});

db.all('SELECT * FROM explore', (err, rows) => {
    if (err) {
        console.error('Error fetching explore:', err);
    } else {
        console.log('explore data is fetched successfully');
    }
});


export default db;