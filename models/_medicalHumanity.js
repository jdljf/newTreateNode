const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const medicalHumanitySchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Medical_humanity', medicalHumanitySchema);
