const mongoose = require('mongoose')
const common = require('../routes/common')
mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const curriculumVideoSchema = mongoose.Schema({
    // img: String,
    videoId: String,
    // title: String,        
    totalTime: Number,
    lastLearn: {
        type: Date,
        default: common.localDate
    },
    // updateTime: {
    //     type: Date,
    //     default: common.localDate
    // },
    // picture: String,        
    learnedTime: Number,
    progress: Number
}, {
    versionKey: false,
    timestamps: {createdAt: 'lastLearn', updateAt: 'updateTime'}
})

const curriculumSchema = mongoose.Schema({
    person: {
        type: String,
        require: true
    },
    newStudy: Boolean,
    curriculums: [curriculumVideoSchema]
})

module.exports = mongoose.model('Curriculum', curriculumSchema);