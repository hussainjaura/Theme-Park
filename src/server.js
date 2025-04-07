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
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use('/structure', express.static(path.join(__dirname, '../structure')));
app.use('/styling', express.static(path.join(__dirname, '../styling')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/logo', express.static(path.join(__dirname, '../logo')));
app.use('/views', express.static(path.join(__dirname, '../views')));
app.use('/app', express.static(path.join(__dirname, '../app')));
app.use('/database', express.static(path.join(__dirname, '../database')));
app.use('/favicon', express.static(path.join(__dirname, '../favicon')));

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


// next feauture that we have to work on si teh event promotion feature that is required to 
// get the data from the database and display it on the event promotion page
// and also make the styling of the event promotion page better
// and make the event promotion page responsive
// and make the event promotion page mobile friendly
// and make the event promotion page tablet friendly
// and make the event promotion page desktop friendly

// the description:
// Provides an additional feature that allows the park to promote the many events that 
// they hold each year. This can vary from concerts being held on their grounds to 
// things like Halloween scare nights.  
// By default, the website should display this year’s events. However, the user should 
// also be able to view what past events have occurred. 
// The user should be able to select a year and then view the events for the given year. 
// Additionally, the user should be able to apply filters to the listed events to narrow 
// them down a little ‘i.e. select events categorised as concerts.’ 
// Upon clicking a listed event, the user should be taken to a page that provides 
// information about said event – this page should make it clear to users if the event 
// has already occurred. 
// o This should be fully database driven and utilise good database practice and 
// design. 
// o AJAX should be used extensively for this feature


//so I already have a evenmts page that is viewing the events for this year but we need a functionality
// where the user can select a year and view the events for the given year
// so for that extract all the data from the database using the feautries like AJAX! and EJS!

