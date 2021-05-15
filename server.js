const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


//api routes
app.get('/api/notes', (req, res) => {
    let file = fs.readFileSync(path.join(__dirname, 'db/db.json'));
    file = JSON.parse(file)
    res.json(file);
});

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json(notes);
})

//html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});


app.listen(PORT, () => console.log(`noteTaker app is listening on PORT ${PORT}`));
