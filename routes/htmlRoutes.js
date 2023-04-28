const path = require('path');

// routing
module.exports = (route) => {

  // Routes to notes.html via GET '/notes'
  route.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // Routes back to the index.html page
  route.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};