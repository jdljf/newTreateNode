const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const personCollectSchema = mongoose.Schema({
    personId: String,
    collectVideo: {
        type: Array
    }
})

module.exports = mongoose.model('Person_collect', personCollectSchema);
