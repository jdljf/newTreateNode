const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const clinicalSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('_clinical', clinicalSchema);
