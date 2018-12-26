const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error'))

const videoNotOfent = mongoose.Schema({
    videoId: String,
    comment: {
        type: Array,
        commentName: String,
        createTime: String,
        content: String,
        replyPerson: {
            type: Array,
            replyName: String,
            createTime: String,
            content: String,
        }
    },
    test: {
        type: Array,
        question: String,
        selectType: Number,
        trueAnswer: Array,
        fraction: Number,
        answer: Array
    }
})

module.exports = mongoose.model('Videonotofent', videoNotOfent);
