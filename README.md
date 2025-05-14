# The Jaura's Theme Park Website - University Assesment

## Overview:

This is a fully functional, responsive theme park website built using HTML, CSS, JavaScript, EJS, Express and Node.js. This project was assigned to me as a University assesment for my 'Web Technologies' Module so that is why I made it. It includes multiple pages, interactive features, AJAX integration, and database-driven content using SQLite3. It was created as part of an academic assessment, fulfilling 100% of the brief and grading criteria, including advanced AJAX features and accessibility compliance.

## How to open project at your local machine:

1. First step is to clone this repository to your local folder in any Integrated Development Environment.
2. write down cd "desired repository" in your terminal.
3. Install the required npm packages/dependencies by typing 'npm install' in terminal.
4. If package.json is not already present, create one by typing 'npm init -y', then install the dependencies listed.
5. Copy the dependencies to your package.json file and then download your node_modules file.
6. After dependencies are installed properly, from root directory type 'node index.mjs' to run the Jaura's Theme Park locally.
7. Open your browser and type 'http://localhost:5000' to run the Website.

## Dependencies:

The following npm packages are required to run this project:

1. **sqlite3** – SQLite client for Node.js to interact with SQLite databases.
2. **ejs** – Embedded JavaScript templating engine.
3. **express** – Web framework for Node.js.
4. **dotenv** – Loads environment variables from a .env file.
5. **nodemon** – Automatically restarts the server on code changes during development.
6. **cors** – Middleware to enable Cross-Origin Resource Sharing.

## Technologies Used:

- HTML5
- CSS
- JavaScript
- EJS
- Node.js
- Express.js
- SQLite3
- AJAX for data updates
- Git & Github
- npm for package management

# Project Features and Functionalities

## User Accessibility:

To ensure a user-friendly experience and compliance with accessibility standards, several features were implemented to manage user access, data persistence, and secure interactions. Here's a breakdown of the website's key features:

### 1. Navigation:

The navigation bar is a core component of the website, offering links to the main attractions. It includes the following key elements:

- Logo: Positioned at the top left for easy identification.
- Links: A navigation menu with links to the major sections, including Attractions, Rides, Tickets, Events, Contact, and FAQ.
- The navbar is consistent across all pages, ensuring seamless navigation.

### 2. Attractions Page:

The Attractions Page provides a detailed view of various rides and attractions available at Jaura's Theme Park. Users can:

- Browse through multiple attraction options.
- Used grid and flex layouts for a visually appealing display.
- Click on specific attractions to view more detailed information on a separate page.
- All data on this page is dynamically fetched from the SQLite database using EJS for rendering.

### 3. Rides Page:

The Rides Page allows users to search and filter rides. Key features include:

- AJAX integration for real-time searching.
- Data fetching from the SQLite database to populate ride details.
- Clickable ride items that redirect to a detailed page for more information.

### 4. Tickets Page:

The Tickets Page provides an overview of the available ticket options, including general admission, annual passes, and VIP experiences. Features of this page:

- CSS-based design with a professional, clean layout.
- Important visitor information like park timings, parking details, and booking instructions.
- No actual ticket purchasing functionality (for this assessment).

### 5. Events Page:

The Events Page showcases current and upcoming events at Jaura's Theme Park. Notable events for 2025 include:

- Spring Bloom Festival: A celebration of nature with workshops, character parades, and seasonal treats.
- Summer Water Carnival: Water shows, splash zones, and themed performances.
- Halloween Nights: Spooky attractions, costume contests, and themed rides.
- Winter Wonderland: A festive winter experience with ice skating, holiday lights, and more.

In addition to displaying current events, the page also supports the viewing of previous events by following features:

- Event filtering by date and category (e.g., concerts, seasonal events).
- The AJAX feature allows users to filter events by category or year.
- Clicking on any event leads to a dedicated event page for more detailed information.

### 6. Contact Us Page:

The Contact Us page includes essential contact details, such as:

- Email address, phone number, and mailing address.
- A contact form that allows users to submit queries and feedback, with entries stored in the SQLite database.

### 7. FAQ Page:

The FAQ Page offers a list of frequently asked questions with answers to help visitors better understand the services and operations of the park. It enhances user experience by addressing common concerns and inquiries.

### 8. Spin the Wheel – Discount Game

To enhance user engagement and incentivize ticket purchases, the site includes a custom-built "Spin the Wheel" game that allows visitors to win exclusive discounts like 500 points, 1000 points, 10%, 15%, or even 50% off on their next visit.

### How It Works:

- Users click the "Spin" button to spin a colorful reward wheel.
- The wheel spins using smooth CSS transitions and JavaScript rotation logic.
- After the animation completes, a random offer (based on where the wheel stops) is displayed in a popup modal.
- A unique coupon code is generated and shown to the user with celebratory messaging.

### Technologies implementation:

- JavaScript is used to calculate spin degrees and determine which reward is selected.
- Random coupon code generation ensures each user gets a unique 8-character alphanumeric code.
- The feature includes a popup system to show the results and a congratulatory container with styling for a premium experience.
- All elements are mobile-friendly and integrated seamlessly with the site's visual theme.

### 9. Custom 404 Error Page

To ensure a smooth and user-friendly experience even when users land on non-existent pages, a custom 404 error page has been implemented.

#### Features:

- Consistent Branding: Matches the overall site theme, including the logo, navigation bar, and footer.
- Helpful Messaging: Displays a clear error message using EJS variables (<%= title %>, <%= message %>, and <%= description %>).
- Navigation Links: Provides quick-access buttons back to Attractions, Rides, Tickets, and Events.
- Helpful Suggestions: Encourages users to use the ride search feature or visit the Contact Us page for assistance.
- Newsletter & Footer: Maintains the global newsletter subscription form and footer across the site, even on the 404 page.

## Styling:

The website uses a blue, white, and black color scheme to maintain a clean and modern look. The CSS is designed to be responsive, ensuring the site works across a variety of screen sizes and devices. Some key styling features include:

- Professional Layout: Consistent use of headers, footers, and organized page structure.
- Mobile-First: The design adapts gracefully to mobile devices using media queries and responsive techniques.

### Footer Section:

### Footer:

Includes a subscription form for the newsletter, contact details, and links to social media profiles (Facebook, Instagram, Twitter).

At the bottom of every page, the footer provides:

#### Contact Information:

- Phone: 0783564738
- Email: thejauras@gmail.com
- Address: 123 Theme Park Way, Southampton, FC 12345
- Social Media Links: Facebook, Instagram, Twitter
- Quick Links: Park Map, Safety Guidelines, FAQs, Career Opportunities
- Copyright Information: © 2024 The Jaura's Theme Park. All rights reserved.

## Code Quality and Best Practices:

Throughout the development of the The Jaura's Theme Park Website, strong idea was placed on writing clean, efficient, and maintainable code. The goal was to follow industry-standard best practices to ensure scalability, readability, and long-term supportability.

### 1. Code Structure

The codebase is organized into logical, reusable modules following separation of concerns.

### Folder Structure:

Routers, Structure, Styling, Database, Images, Logo, App and view templates etc, are all separated into dedicated directories.

This well structured and defined architecture allows for easier debugging, testing, and future expansion.

### 2. Clean & Readable Syntax

All code follows consistent formatting conventions, such as meaningful, straightforward variable and function names, consistent indentation, and proper comments.

Code has been written in a way that comments are not repeated again and again

Functions and handlers are written with single-responsibility in mind, making them easier to maintain and test.

### 3. Error Handling & Logging

Proper try/catch blocks and middleware-based error handling are implemented to gracefully manage unexpected issues and prevent crashes.

### 4. Source Control & Collaboration

Git has been used for version control, following standard commit practices and branching models.

Each new feature or bug fix is developed in a separate branch and merged via pull requests to maintain a clean and trackable development history.

### 5. API & Database Interaction

Database operations are handled through sqlite3 , ensuring structured and secure communication with the SQLite Database.

All API endpoints follow RESTful design principles, making backend interactions intuitive and scalable.

## Contribute to my Website:

- 1. Fork the repo
- 2. Create a new branch ('git checkout -b feature-branch')
- 3. Make your changes
- 4. Push to the branch ('git push origin feature-branch')
- 5. Open a pull request

## Contact:

- Email: [hussainjaura10@gmail.com]
- LinkedIn: [https://www.linkedin.com/in/muhammad-hussain-jaura-b303482b1/]
