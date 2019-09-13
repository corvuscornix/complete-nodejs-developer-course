const chalk = require('chalk')
const fs = require('fs')

function listNotes() {
    const notes = loadNotes()
    console.log(chalk.white.inverse('Your notes:'))
    notes.forEach(note => {
        console.log(chalk.white.inverse('\r\n' + note.title))
    })
}

function addNote(title, body) {
    const notes = loadNotes();
    if (notes.some(note => note.title === title)) {
        console.log(chalk.red.inverse('Note title is reserved!'))
    } else {
        notes.push({title, body})
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added!'))
    }
}

function readNote(title) {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if (note) {
        console.log(chalk.white.inverse(note.title))
        console.log()
        console.log(chalk.white.inverse(note.body))
    } else {
        console.log(chalk.red.inverse('No note was found for title ' + title))
    }
}

function loadNotes () {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (e) {
        return []
    } 
}

function saveNotes (notes = []) {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

function removeNote(title) {
    let notes = loadNotes();
    let countBeforeDelete = notes.length
    notes = notes.filter(note => note.title !== title)
    if (notes.length === countBeforeDelete) {
        console.log(chalk.red.inverse('Didn\'t find a note titled ' + title))
    } else {
        saveNotes(notes)
        console.log(chalk.green.inverse('Removed note: ' + title))
    }
}

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote
}