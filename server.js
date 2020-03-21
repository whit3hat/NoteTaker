//Dependencies
const express = require ('express');
const path = require('path');
const apiRoutes = require("./routes/apiRoutes");

//Setup Express App
var app = express();
var PORT = process.env.PORT || 3000;


//Setup the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// /middleware
app.use('/api', apiRoutes)
//Routes
//=============================================

//Basic route that sends the user first to the index page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

//Route to the notes page
app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, './public', 'notes.html'));
});


app.get('/api/notes', function(req, res){
    console.log(req.body);
});


//Start the server
//==========================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
