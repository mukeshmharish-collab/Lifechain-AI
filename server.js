const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

const PORT = 3000;

// Tell Express where our frontend files are
app.use(express.static(__dirname));

// Open index.html when visiting localhost:3000
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/register", (req, res) => {

    console.log(req.body);

    res.json({
        message: "Patient data received successfully!"
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});