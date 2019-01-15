const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const publicHealthSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Public_health', publicHealthSchema);
