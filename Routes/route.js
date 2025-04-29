import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../database/database.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Get the rides page
router.get('/rides', (req, res) => {
    db.all("SELECT * FROM rides", (err, rows) => {
        if (err) {
          console.error("Error fetching attractions:", err);
          res.status(500).send("Error fetching attractions");
        } else {
          res.render("main-rides", { rides: rows });
        }
      });
});

// Get the tickets page
router.get('/tickets', (req, res) => {
    res.sendFile(path.join(__dirname, '../structure/tickets.html'));
});

// Get the events page
router.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '../structure/events.html'));
});

// Get the contact page
router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../structure/contact.html'));
});

// Get the FAQ page
router.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, '../structure/faq.html'));
});

// Get the activity page
router.get('/activity', (req, res) => {
    res.sendFile(path.join(__dirname, '../structure/activity.html'))
})

export default router;

