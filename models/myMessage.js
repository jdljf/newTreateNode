const mongoose = require('mongoose')
const common = require('../routes/common')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const messageDetailSchema = mongoose.Schema({
    detail: String,
    create_Time: {
        type: Date,
        default: common.localDate
    },
    update_Time: {
        type: Date,
        default: common.localDate
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'create_Time', updatedAt: 'update_Time' }
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
}, {
    versionKey: false,
    timestamps: { createdAt: 'create_Time', updatedAt: 'update_Time' }
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