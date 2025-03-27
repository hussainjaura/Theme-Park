import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from '../Routes/route.js';

// Get the directory name equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

// Serve static files
app.use('/structure', express.static(path.join(__dirname, '../structure')));
app.use('/styling', express.static(path.join(__dirname, '../styling')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/logo', express.static(path.join(__dirname, '../logo')));


app.use('/', router);

app.get('/', (req, res) => {
  // Send the HTML file, using path.join() to correctly resolve the file path
  res.sendFile(path.join(__dirname, '../structure/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// needs owrking at the ticket page becuase prices not mentioned!!
