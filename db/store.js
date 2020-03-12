const fs = require('fs');
const util = require('util');

var readFiles = util.promisify(fs.readFile);
var writeFiles = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;
    }
    read() {
        return readFiles("db/db.json", "utf8");
    };

    write(note){
        return writeFiles("db/db.json", JSON.stringify(note));
    }
//constructor for the getNotes function to pass to the route
    getNotes(){
        return this.read().then(notes => {
            let parsedNotes;

            //If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }
//constructor for the addNote function to pass to the route
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }
        console.log(note);
        // Increment 'this.lastId' and assign it to 'newNote.id'
        const newNote = { title, text, id: ++this.lastId };

        //Get all notes, add the new note, write all the updated notes, return the newNote
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id){
        //get all notes, remove the note with the given id write the  filtered notes
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Store();