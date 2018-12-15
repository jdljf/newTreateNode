const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const naireSchema = mongoose.Schema({
    question: {
        type: String,
        require: true
    },
    selectType: {
        type: String,
        default: 0
    },
    answer: {
        type: Array,
        require: true,
    }
})

module.exports = mongoose.model('Questionnaire', naireSchema);