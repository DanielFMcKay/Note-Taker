
const fs = require('fs')
const path = require('path');

var uniqid = require('uniqid');


// routing stuff
module.exports = (route) => {

  // GET /api/notes should read the db.json file and return all saved notes as JSON.
  route.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // POST /api/notes should receive a new note to save on the request body, 
  // add it to the db.json file, and then return the new note to the client. 
  route.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    // creating the body for a new note
    let userNote = {
      title: req.body.title,
      text: req.body.text,

      // Uniqid assigns a unique id for each new note. Kinda straightforward tbh.
      id: uniqid(),
    };
    // pushing created note to be written in the db.json file
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });


  // Deleting Notes: /api/notes/:id receives the id for the note to delete. In theory.
  route.delete('/api/notes/:id', (req, res) => {
    // reading note fromdb.json
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // removing note with id
    let deleteNote = db.filter(item => item.id !== req.params.id);
    // Overwriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
    
  })
};