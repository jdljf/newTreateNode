const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const medicalExaminationSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Medical_examination', medicalExaminationSchema);
