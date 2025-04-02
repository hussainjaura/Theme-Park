import sqlite from 'sqlite3';
import path from 'path';

sqlite.verbose();

const dbPath = path.resolve('./database/theme.db');

const contactdb = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the theme database for contact data');
        contactdb.run(`CREATE TABLE IF NOT EXISTS contact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            subject TEXT,
            message TEXT
        )`);
    }
});

export default contactdb;


