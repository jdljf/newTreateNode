const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const curriculumSchema = mongoose.Schema({
    person: {
        type: String,
        require: true
    },
    curriculums: {
        type: Array,
        img: String,
        video: String,
        title: String,
        totalTime: String,
        lastLearn: String,
        picture: String,        
        learnedTime: String,
        progress: String
    }
})

module.exports = mongoose.model('Curriculum', curriculumSchema);