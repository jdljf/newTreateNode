const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const westernMedicineSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Western_medicine', westernMedicineSchema);
