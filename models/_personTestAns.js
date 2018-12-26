const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const personTestAns = mongoose.Schema({
    personId: String,
    videoId: String,
    formAnswer: Object,
    trueCount: Number,
    totalScore: Number
})

module.exports = mongoose.model('Person_testans', personTestAns);
