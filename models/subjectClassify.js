const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const subjectClassifyShema = mongoose.Schema({
    name: String,
    detail: {
        type: Array,
        describe: Number,
        img: String,
        watched: Number,
        comment: Number,
        share: Number,
        collection: Number,
        handout: String,
        test: String
    }
})

// subjectClassifyShema.static('getClassify', function (name, callback) {
//     return this.find({name}, {name:1}, callback)
//     // return this.find({ name: name }, callback);
// });

module.exports = mongoose.model('Subjectclassify', subjectClassifyShema);