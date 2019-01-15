const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const medicalComputerSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Medical_computer', medicalComputerSchema);
