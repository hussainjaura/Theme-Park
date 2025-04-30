import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../database/database.js';

// to create an express router instance
const ejsRoutes = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// using get request and fetching data from attractions table
ejsRoutes.get('/attractions-ejs/:id', (req, res) => {
    const attractionsId = req.params.id;
    db.get('SELECT * FROM attractions WHERE id = ?', [attractionsId], (err, row) => {
        if (err) {
            console.error('Error fetching ride:', err);
            res.status(500).send('Error fetching ride');
        } else {
            // using arrays to display data from attractions table in ejs files
            res.render('attractions', { attractions: [row] });
        }
    });
});

// get request and fetching rides from rides table
ejsRoutes.get('/rides-ejs/:id', (req, res) => {
    const rideId = req.params.id;
    db.get('SELECT * FROM rides WHERE id = ?', [rideId], (err, row) => {
        if (err) {
            console.error('Error fetching ride:', err);
            res.status(500).send('Error fetching ride');
        } else {
            // wrapping in array to be used in ejs files
            res.render('rides', { rides: [row] });
        }
    });
});

// using get request for search funcionality here
ejsRoutes.get('/api/search', (req, res) => {
    const search = req.query.q;
    console.log('Search query:', search);

    db.all('SELECT * FROM rides WHERE title LIKE ?', [`%${search}%`], (err, rows) => {
        if (err) {
            console.error('Error searching rides:', err);
            return res.status(500).json({ error: 'Database ran into an error' });
        }
        // to return search results as json
        res.json(rows);
    });
});

// using get request and to filter events based on queries
ejsRoutes.get('/api/events/:query', (req, res) => {
    const query = req.params.query;
    console.log('Backend received query:', query);

    // handle all keyword to fetch all events
    if (query === 'all') {
        console.log('Fetching all events');
        db.all('SELECT * FROM events', (err, rows) => {
            if (err) {
                console.error('Error fetching all events:', err);
                return res.status(500).json({ error: 'Database ran into an error' });
            }
            console.log('Found events:', rows);
            return res.json(rows);
        });
        return;
    }

    // if query is a year format like 2023-events
    const yearMatch = query.match(/^(\d{4})-events$/);
    if (yearMatch) {
        const year = yearMatch[1];
        console.log('Fetching events for year:', year);
        db.all('SELECT * FROM events WHERE year = ?', [year], (err, rows) => {
            if (err) {
                console.error('Error fetching events by year:', err);
                return res.status(500).json({ error: 'Database ran into an error' });
            }
            console.log('Found events for year:', rows);
            return res.json(rows);
        });
        return;
    }

    // map dropdown input values to DB type values
    const typeOfEvent = {
        'concert-series': 'concert',
        'cultural-festival': 'cultural',
        'seasonal-events': 'seasonal'
    };

    const eventType = typeOfEvent[query] || query;

    db.all('SELECT * FROM events WHERE type = ?', [eventType], (err, rows) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json({ error: 'Database ran into an error' });
        }
        res.json(rows);
    });
});



// using get request to render previous event page
ejsRoutes.get('/api/events/previous/:query', (req, res) => {
    const query = req.params.query;
    console.log('Rendering file for id:', query);

    db.get('SELECT * FROM prevEvents WHERE id = ?', [query], (err, row) => {
        if (err) {
            console.error('Error fetching event:', err);
            res.status(500).send('Error fetching event');
        } else if (!row) {
            res.status(404).send('Event not found');
        } else {
            // wrapping here so that can be used in ejs like this [0]
            res.render('prevEvents', { prevEvents: row });
        }
    });
});


export default ejsRoutes;
