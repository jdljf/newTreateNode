const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const informationFlowSchema = mongoose.Schema({
    title: String
})

module.exports = mongoose.model('Informationflow', informationFlowSchema);