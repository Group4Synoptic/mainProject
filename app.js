const express = require("express");
const path = require("path");
const app = express();
const port = 1942;
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

  if (!firstName || !lastName || !email || !message || !contactReason) { // backend validation for added security (js frontend could be bypassed)
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  console.log('Received contact form:', req.body);

  // Send success response
  res.json({ success: true });
});
