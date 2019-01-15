const mongoose = require('mongoose')
const common = require('../routes/common')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const replySchema = mongoose.Schema({
    replyName: String,
    createTime: {
        type: Date,
        default: common.localDate
    },
    content: String,
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'update_Time' }
})

const commentSchema = mongoose.Schema({
    commentName: String,
    createTime: {
        type: Date,
        default: common.localDate
    },
    content: String,
    replyPerson: [replySchema]
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'update_Time' }
})

const testSchema = mongoose.Schema({
    question: String,
    selectType: Number,
    trueAnswer: Array,
    fraction: Number,
    answer: Array
})

const videoNotOfent = mongoose.Schema({
    videoId: String,
    comment: [commentSchema],
    test: [testSchema]
})

module.exports = mongoose.model('Videonotofent', videoNotOfent);
