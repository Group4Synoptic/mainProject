require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const port = 1942;
const fs = require("fs");
const { Pool } = require('pg');

// db connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }
});

const session = require('express-session');

app.use(session({
  secret: 'RANDOMKEYCHANGE',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // day session ** CAN ALTER IF NEEDED
}));

app.listen(port, () => {
    console.log(`myapp is listening on port ${port}!`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
        if (err) console.log(err);
    });
});

// route for contact page
app.post('/contact', (req, res) => {
    const { firstName, lastName, email, message, contactReason, timestamp } = req.body;

    if (!firstName || !lastName || !email || !message || !contactReason) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    console.log('Received contact form:', req.body);

    let usersjson = fs.readFileSync("public/json/contact.json", "utf-8");
    let users;

  try {
    users = JSON.parse(usersjson);
    if (!users.contactFormSubmissions) {
        users.contactFormSubmissions = [];
    }
  } catch (err) {
    users = { contactFormSubmissions: [] };
  }

    // Push new submission inside the array
    users.contactFormSubmissions.push(req.body);

    // Write it back to file
    fs.writeFileSync("public/json/contact.json", JSON.stringify(users, null, 2), "utf-8");

    res.json({ success: true });
});

// route for register page
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ success: false, error: 'Missing fields' });

  try {
    const userExists = await pool.query(
        `SELECT * FROM "synopticProjectRegistration".users WHERE username = $1`,
        [username]
    );

    if (userExists.rows.length > 0) {
        return res.status(400).json({ success: false, error: 'Username already exists' });
    }

    const result = await pool.query(
        `INSERT INTO "synopticProjectRegistration".users (username, password) VALUES ($1, $2) RETURNING id`,
        [username, password]
    );

    res.json({ success: true, userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// route for login page
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM "synopticProjectRegistration".users WHERE username = $1 AND password = $2`,
      [username, password]
    );

    if (result.rows.length === 1) {
      req.session.user = {
        id: result.rows[0].id,
        username: result.rows[0].username
      };

      req.session.save(err => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ success: false, error: 'Session failed' });
        }

        return res.json({ success: true, message: 'Logged in!' });
      });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});


// Logout page route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out!' });
  });
});

// this function is to be used on pages where a login is REQUIRED i.e the water demands page

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, error: 'You need to login' });
    }
}

// session route to grab username
app.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});
