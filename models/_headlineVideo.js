const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const headline_VideoSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Headline_video', headline_VideoSchema);
