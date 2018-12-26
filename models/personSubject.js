const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const personSubjectSchema = mongoose.Schema({
    personId: String,
    classify: {
        type: Array,
        subjectId: String,
        subject: {
            type: Array,
            persubjectId: String,
            collect: Boolean,
            learnedTime: Number,
            totalTime: Number,
            proportion: Number
        }    
    }
})

module.exports = mongoose.model('Personsubject', personSubjectSchema);