const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const flowVideoSchema = mongoose.Schema({
    name: String,
    dataName: String,
    img: String,
})

module.exports = mongoose.model('Flow_Video', flowVideoSchema);
