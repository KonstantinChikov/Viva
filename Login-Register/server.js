const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

// Initialize the app and database
const app = express();
const db = new sqlite3.Database("./database.sqlite");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create the users table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`
);

// Register User
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert into database
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.run(query, [name, email, password], function (err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "User registered successfully", userId: this.lastID });
  });
});

// Login User
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  // Validate input
  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check in database
  const query = "SELECT * FROM users WHERE name = ? AND password = ?";
  db.get(query, [name, password], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
