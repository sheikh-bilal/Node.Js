const fs = require('fs')
const { title } = require('process')
const { default: chalk } = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    
    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added..!!'))
    }else{
        console.log(chalk.bgRed('Title already exist'))
    }
}
const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotesList = notes.filter((note) =>  note.title != title)    
    if(updatedNotesList.length < notes.length){
        saveNotes(updatedNotesList)
        console.log(chalk.green.inverse('Remove Note Successfully..!!'))
    }else{
        console.log(chalk.bgRed('No related Note found'))
    }
}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.bold.inverse('Your Notes'))
    notes.forEach(note => {
      console.log('Title: '+ note.title)  
    })
}
const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    if(noteToRead){
        console.log('Title: ' + chalk.bold.bgBlue(noteToRead.title))
        console.log('Body: ' + noteToRead.body)
    }else{
        console.log(chalk.bgRed('No related Note found'))
    }
}

const saveNotes =  (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSONParse = JSON.parse(dataBuffer)
        return dataJSONParse
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote:readNote
}