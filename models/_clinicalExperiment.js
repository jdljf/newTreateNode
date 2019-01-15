const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const clinicalExperimentSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Clinical_experiment', clinicalExperimentSchema);
