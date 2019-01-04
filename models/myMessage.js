const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const myMessageSchema = mongoose.Schema({
    personId: String,
    message: {
        type: Array,
        watched: Boolean,
        messageType: Number,
        summary: String,
        title: String,
        detail: String,
        createTime: String,
        messageDetail: {
            type: Array,
            index: {type: Number, index: true},
            detail: String,
            createTime: String
        }
    }
})

module.exports = mongoose.model('Mymessage', myMessageSchema);