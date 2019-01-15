const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const curriculumVideoSchema = mongoose.Schema({
    videoId: String,
    curriculumId: Array
})

module.exports = mongoose.model('Curriculum_Video', curriculumVideoSchema);
