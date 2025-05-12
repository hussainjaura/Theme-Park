import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// to get file and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// to get absolute path to SQLite database
const dbPath = path.join(__dirname, "theme.db");

// open the SQLite database
const contactdb = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});

// create a contact table if it doesn't exist
const createContactTable = async () => {
  try {
    await contactdb.run(`CREATE TABLE IF NOT EXISTS contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT
    )`);
    console.log("Contact table created or already exists.");
  } catch (err) {
    console.error("Error creating contact table:", err);
  }
};

createContactTable();

export default contactdb;

// import sqlite from "sqlite3";
// import path from "path";
// import { fileURLToPath } from "url";
// // this is to get file and directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // to get absolute path to sqllite database
// const dbPath = path.join(__dirname, "theme.db");
// // to get more detailed error loggings we use verbose
// sqlite.verbose();

// // create a database conncetion to theme database
// const contactdb = new sqlite.Database(dbPath, (err) => {
//   if (err) {
//     console.error("Error opening database");
//   } else {
//     console.log("Connected to the theme database for contact data");
//     // create a contact table if it doesnt exist
//     contactdb.run(`CREATE TABLE IF NOT EXISTS contact (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             email TEXT,
//             subject TEXT,
//             message TEXT
//         )`);
//   }
// });

// export default contactdb;
