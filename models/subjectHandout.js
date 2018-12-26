const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection
var ObjectId = mongoose.Schema.Types.ObjectId;
db.on('error', console.error.bind(console, 'connection error'))

const subjectHandoutSchema = mongoose.Schema({
    subjectId: String,
    handout: {
        type: Array,
        img: String,
        content: Array,
    }
})

module.exports = mongoose.model('Subjecthandout', subjectHandoutSchema);