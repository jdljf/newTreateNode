const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const excellentCouseSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Excellent_couse', excellentCouseSchema);
