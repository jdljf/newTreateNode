const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const aboutUsShema = mongoose.Schema({
    content: []
})

module.exports = mongoose.model('Aboutus', aboutUsShema);