const fs = require('fs');
const util = require('util');

var readFiles = util.promisify(fs.readFileSync);

var writeFile = util.promisify(fs.writeFile);

class Store {
    read(){
        return readFiles('./db.json', 'utf8')
    };
    write(note){
        console.log(note)
    }
    getNotes(){
        return this.read().then(notes => {
            var parseNotes; try{
                parseNotes = [].concat(json.parse(notes))
            }catch(error){
                console.log(error);

            }
        })
    }
}

module.exports = Store;