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
    }
}

module.exports = mongoose.model('User', userSchema);