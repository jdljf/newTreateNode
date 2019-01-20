const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error'))

const aboutVideo = mongoose.Schema({
    videoId: String,
    aboutId: {
        type: Array
    }
})

module.exports = mongoose.model('About_Video', aboutVideo);
