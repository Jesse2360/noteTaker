const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))

//html routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))
});

//api routes
app.get('/api/notes', (req, res) => {
    res.json()
});

app.post('/api/notes', (req, res) => {
    res.json()
})

app.listen(PORT, () => console.log(`noteTaker app is listening on PORT ${PORT}`));
