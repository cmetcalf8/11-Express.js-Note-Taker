const express = require('express');
const path = require('path');
const api = require('./Develop/public/assets/index.js');
const fs = require('fs');
const database = require('mime-db');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
  });

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

app.route("/api/notes")
    .get(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        let highestId = 99;
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];
            if(individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        }

        newNote.id = highestId + 1;
        database.push(newNote)
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved.");
        });
        res.json(newNote);
    });



app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });