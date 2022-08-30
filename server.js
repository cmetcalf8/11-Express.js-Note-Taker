const express = require('express');
const path = require('path');
const fs = require('fs');
const database = require('./db/db');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("/api/notes", function (req, res) {
    console.log(database);
    res.json(database);
})

app.post("/api/notes", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    let highestId = 99;
    for (let i = 0; i < database.length; i++) {
        let individualNote = database[i];
        if (individualNote.id > highestId) {
            highestId = individualNote.id;
        }
    }

    newNote.id = highestId + 1;
    database.push(newNote)
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("Your note was saved.");
    });
    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    for (let i = 0; i < database.length; i++) {
        if (database[i].id == req.params.id) {
            database.splice(i, 1);
            break;
        }
    }


    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted.");
        }
    });
    res.json(database);
});



app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});