const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const answerSchema = mongoose.Schema({
    person: {
        type: String,
        require: true
    },
    answers: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model('Naireanswer', answerSchema);