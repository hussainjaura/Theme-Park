import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from '../Routes/route.js';
import ejsRoutes from '../Routes/ejs.js';
import contactdb from '../database/contact.js';

// Get the directory name equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// to enable using forms in the html files
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

// Serve static files
app.use('/structure', express.static(path.join(__dirname, '../structure')));
app.use('/styling', express.static(path.join(__dirname, '../styling')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/logo', express.static(path.join(__dirname, '../logo')));
app.use('/views', express.static(path.join(__dirname, '../views')));
app.use('/app', express.static(path.join(__dirname, '../app')));
app.use('/database', express.static(path.join(__dirname, '../database')));

app.use('/', router);
app.use('/', ejsRoutes);

app.get('/', (req, res) => {
  // Send the HTML file, using path.join() to correctly resolve the file path
  res.sendFile(path.join(__dirname, '../structure/index.html'));
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Some fields are missing." });
  }

  try {
      contactdb.run('INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)', 
          [name, email, subject, message], 
          function(err) {
              if (err) {
                  console.error('Database error:', err);
                  return res.status(500).json({ message: "Error inserting data into the database." });
              }
              res.status(200).json({ message: "Message sent successfully." });
          }
      );
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: "An error occurred while sending the message." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
