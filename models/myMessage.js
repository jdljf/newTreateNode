const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const messageDetailSchema = mongoose.Schema({
    detail: String,
    create_Time: {
        type: Date
    }
})

const messageSchema = mongoose.Schema({
    watched: Boolean,
    messageType: Number,
    summary: String,
    title: String,
    detail: Array,
    create_Time: {
        type: Date,
        default: Date.now
    },
    messageDetail: [messageDetailSchema]
})

const myMessageSchema = mongoose.Schema({
    personId: String,
    create_Time: {
        type: Date,
        default: Date.now
    },
    message: [messageSchema]
})

module.exports = mongoose.model('Mymessage', myMessageSchema);