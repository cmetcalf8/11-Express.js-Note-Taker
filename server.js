const express = require('express');
const path = require('path');
const api = require('./Develop/public/assets/index.js');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.get('/api/', (req, res) => res.json(petData));

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });