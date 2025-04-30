import sqlite from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// to get the absolute path to this file and its directory 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// to get absolute path to the database
const dbPath = path.join(__dirname, 'theme.db');

// to get detailed errors
sqlite.verbose();

// to create and open our theme database
const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the theme database for ride and attraction data');
    }
});

// to execute a query to fetch all data from the attractions table
db.all('SELECT * FROM attractions', (err, rows) => {
    if (err) {
        console.error('Error fetching explore:', err);
    } else {
        console.log('attractions data is fetched successfully');
    }
});

export default db;
