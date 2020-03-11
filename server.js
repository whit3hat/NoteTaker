//Dependencies
const fs = require ('fs');
const express = require ('express');
const path = require('path');
const Store = require('./db/store');

//Setup Express App
var app = express();
var PORT = process.env.PORT || 3000;
var router = require("express").Router()

router.route('/notes', function(req, res){
    Store.getNotes().then(notes=>{
        console.log(notes);
        res.json(notes).catch(error =>{
            console.log(error); 
            res.status(500).json(error);
        })
    })
})

app.use('/notes', router)
//Setup the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Routes
//=============================================

//Basic route that sends the user first to the index page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Route to the notes page
app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


app.get('/api/notes', function(req, res){
    console.log(req.body);
});

//POST Note to db//

//JSON to array
// try {
//     const notes = fs.readFileSync('/db/db.json', 'utf8') 
//         console.log(notes)
//         } catch (err) {
//         console.log(err);

//         app.post('/api/notes', function(req, res){
//             // return res.json(notes);
//             notes({
//                 title: req.body,
//                 text: req.body
//             })
//            newNote.push(db.json);
//         });


//     };


//Start the server
//==========================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
