const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

var titleOptions = {
  describe:'Title of note',
  demand:true,
  alias: 't'
};
var bodyOptions = {
  describe:'Body of note',
  demand:true,
  alias: 'b'
};
const argv = yargs
.command('add', 'Add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
  title:titleOptions,
})
.command('remove', 'Remove a note', {
  title:titleOptions,
})
.help()
.argv;
var command = argv._[0];

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if (note){
    console.log('Note: ', note.title, ' Added')
  } else {
    console.log('Error: Note with same name found')
  }
}else if (command === 'list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    console.log('Note Title: ', note.title)
    console.log('Note Body: ', note.body)
  });
}else if (command === 'read'){
  var note = notes.readNote(argv.title);
  if (note){
    console.log('Note Title: ', note.title)
    console.log('Note Body: ', note.body)
  } else {
    console.log('Error: Note not found')
  }
}else if (command === 'remove'){
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
}else {
  console.log('cmd not recognised');

}

// console.log(_.isString('abc'));
// console.log(_.isString(true));
//
// console.log(_.uniq([2,1,2, 'Mike', 5]));

// var res = notes.addNote();
// console.log(res);

// var res2 = notes.add(9, -2);
// console.log(res2);
// var user = os.userInfo().username;
// fs.appendFileSync('greetings.txt', `Hello ${user}! Age:  ${notes.age}.`);
