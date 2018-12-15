const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const couponSchema = mongoose.Schema({
    title: String,
    beginTime: String,
    endTime: String,
    img: String,
    reaminCount: String,
    canReceiveCount: String
})

module.exports = mongoose.model('Coupon', couponSchema);