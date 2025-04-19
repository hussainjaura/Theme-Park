import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Get the explore page
router.get('/explore', (req, res) => {
    res.sendFile(path.join(__dirname, '../structure/explore.html'));
});

// Get the rides page
router.get('/rides', (req, res) => {
    res.sendFile(path.join(__dirname, '../structure/rides.html'));
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

