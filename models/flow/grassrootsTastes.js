const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const grassrootsTastesSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Grassroots_tastes', grassrootsTastesSchema);
