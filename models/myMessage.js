const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const myMessageSchema = mongoose.Schema({
    personId: String,
    create_Time: {
        type: Date,
        default: Date.now
    },
    message: {
        type: Array,
        watched: Boolean,
        messageType: Number,
        summary: String,
        title: String,
        detail: Array,
        create_Time: {
            type: Date,
            default: Date.now
        },
        messageDetail: {
            type: Array,
            index: { type: Number, index: true },
            detail: String,
            create_Time: String
        }
    }
})

module.exports = mongoose.model('Mymessage', myMessageSchema);