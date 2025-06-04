const express = require("express");
const path = require("path");
const app = express();
const port = 1942;
const fs = require("fs");

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

app.post('/contact', (req, res) => {
  const { firstName, lastName, email, message, contactReason, timestamp } = req.body;

  if (!firstName || !lastName || !email || !message || !contactReason) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  console.log('Received contact form:', req.body);

  let usersjson = fs.readFileSync("public/contact.json", "utf-8");
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
  fs.writeFileSync("public/contact.json", JSON.stringify(users, null, 2), "utf-8");

  res.json({ success: true });
});
