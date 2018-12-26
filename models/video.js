const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error'))

const videoSchema = mongoose.Schema({
    img: String,
    title: String,
    durationTime: Number,
    watched: Number,
    common: Number,
    collect: Number,
    share: Number,
    ReleasedTime: Number,
    handout: Array,
    test: {
        type: Array,
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
    }
})

module.exports = mongoose.model('Video', videoSchema);
