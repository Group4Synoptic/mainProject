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

