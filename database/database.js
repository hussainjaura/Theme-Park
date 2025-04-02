import sqlite from 'sqlite3';

sqlite.verbose();

const db = new sqlite.Database('./database/theme.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the theme database');
    }
});

export default db;