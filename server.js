// code goes here

const express = require('express');

// I really wanna go against the grain here on the whole "app" thing...
const app = express();


// This are live listening PORT
const PORT = process.env.PORT || 3001
;


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes for the Route God
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);


// Kind of important to actually 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));