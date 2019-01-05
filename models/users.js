const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

// module.exports = mongoose.model('Cat', { name: String });
// const Schema = mongoose.Schema

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const userSchema = {
    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },    
    password: {
        type: String,
        require: true
    },
    idNumber: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    province: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    area: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    curriculum: {
        type: Number,
        default: 0
    },
    learnedTime: {
        type: Number,
        default: 0
    },
    medicalBeans: {
        type: Number,
        default: 0
    },
    created_time: {
        type: Date,
        // 注意：这里不要写 Date.now() 因为会即刻调用
        // 这里直接给了一个方法：Date.now
        // 当你去 new Model的时候，如果你没有传递 create_time，
        // 则mongoose 就会调用 default 指定的 Data.now 方法，使用其返回值作为默认值
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    }
}

module.exports = mongoose.model('User', userSchema);