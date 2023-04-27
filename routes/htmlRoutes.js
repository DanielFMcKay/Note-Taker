const path = require('path');


// routing
module.exports = (app) => {


  // Routes to notes.html via GET '/notes'
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // Routes back to the index.html page
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};