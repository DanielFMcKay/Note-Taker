
const fs = require('fs')
const path = require('path');

// const saveNote = require('../db/db.json');

// Creates a unique ID for each note.
var uniqid = require('uniqid');

const router = require('express').Router();


// routing

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'))
    .catch(err => res.status(500).json(err));
});

// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client. 
router.post('/api/notes', (req, res) => {
  let db = fs.readFileSync('../db/db.json');
  db = JSON.parse(db);
  res.json(db)
    .catch(err => res.status(500).json(err));

  // creating body for a new note
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uniqid(),
  };
  // pushing created note to be written in the db.json file
  db.push(newNote);
  fs.writeFileSync('../db/db.json', JSON.stringify(db));
  res.json(db)
    .catch(err => res.status(500).json(err));

});


// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
router.delete('/api/notes/:id', (req, res) => {
  // reading notes form db.json
  let db = JSON.parse(fs.readFileSync('../db/db.json'))
  // removing note with id
  let deleteNote = db.filter(item => item.id !== req.params.id);
  // Rewriting note to db.json
  fs.writeFileSync('../db/db.json', JSON.stringify(deleteNote));
  res.json(deleteNote);

});

module.exports = router;
