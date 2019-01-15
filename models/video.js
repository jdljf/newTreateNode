const mongoose = require('mongoose')
const common = require('../routes/common')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const videoSchema = mongoose.Schema({
    img: String,
    videoUrl: String,
    isVideo: {
        type: Boolean,
        default: 0
    },
    canStudy: {
        type: Number,
        default: 0
    },
    publisher: String,
    title: String,
    durationTime: Number,
    watched: {
        type: Number,
        default: 0
    },
    comment: {
        type: Number,
        default: 0
    },
    collect: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    },
    ReleasedTime: Number,
    handout: Array,
    test: {
        type: Array,
        question: {
            type: String,
            require: true
        },
        selectType: {
            type: String,
            default: 0
        },
        answer: {
            type: Array,
            require: true,
        }
    },
    createTime: {
        type: Date,
        default: common.localDate
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'createTime', updateAt: 'updateTime'}
})

module.exports = mongoose.model('Video', videoSchema);
