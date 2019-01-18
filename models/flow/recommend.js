const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const recommendSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('_recommend', recommendSchema);
