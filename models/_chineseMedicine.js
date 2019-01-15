const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })


const chineseMedicineSchema = mongoose.Schema({
    videoId: String
})

module.exports = mongoose.model('Chinese_medicine', chineseMedicineSchema);
