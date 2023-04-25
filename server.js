// code goes here
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// links to 
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


// Kind of important to actually 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));