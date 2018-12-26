const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const reward = mongoose.Schema({
    rewardType: {
        type: Number
    },
    minRange: Number,
    maxRange: Number,
    reward: {
        medicalBeans: String
    }
})

module.exports = mongoose.model('reward', reward);
