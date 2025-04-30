import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "../Routes/route.js";   
import ejsRoutes from "../Routes/ejs.js"; 
import contactdb from "../database/contact.js";
import db from "../database/database.js";

// to get file and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// to initialize express app and define port
const app = express();
const port = 5000;

// this is middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Enable cors and json parsing
app.use(cors());
app.use(express.json());

// set view engine to ejs for server-side rendering
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// serve static files from various folders
app.use("/structure", express.static(path.join(__dirname, "../structure")));
app.use("/styling", express.static(path.join(__dirname, "../styling")));
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use("/logo", express.static(path.join(__dirname, "../logo")));
app.use("/views", express.static(path.join(__dirname, "../views")));
app.use("/app", express.static(path.join(__dirname, "../app")));
app.use("/database", express.static(path.join(__dirname, "../database")));
app.use("/favicon", express.static(path.join(__dirname, "../favicon")));

// use main and ejs-specific routers
app.use("/", router);
app.use("/", ejsRoutes);

// render the homepage/attractions page with attraction data
app.get("/", (req, res) => {
  db.all("SELECT * FROM attractions", (err, rows) => {
    if (err) {
      console.error("Error fetching attractions:", err);
      res.status(500).send("Error fetching attractions");
    } else {
      // pass data to ejs to display
      res.render("index", { attractions: rows });
    }
  });
});

// this is post request to post data from contact form to database
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // basic validation for required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Some fields are missing." });
  }

  try {
    contactdb.run(
      "INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message],
      function (err) {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ message: "Error inserting data into the database." });
        }
        res.status(200).json({ message: "Message sent successfully." });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the message." });
  }
});

// Catching all 404 page for unknown routes
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
    message: "Oh-No",
    description:
      "The page you were looking for does not exist. Please check the URL or navigate back to our homepage.",
  });
});

// start the server with port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
