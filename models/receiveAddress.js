const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

const detailAddress = mongoose.Schema({
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
    receiveAddress: {
        type: String,
        require: true
    },
    receiveName: {
        type: String,
        require: true
    },
    receivePhone: {
        type: Number,
        require: true
    },
    isDefault: {
        type: Boolean,
        require: true
    }
})

const addressSchema = mongoose.Schema({
    phoneNumber: Number,
    name: {
        type: String,
        require: true
    },
    personId: {
        type: String,
        require: true
    },
    receiveAddresses: {
        type: [detailAddress]
    }    
})

module.exports = mongoose.model('Receiveaddress', addressSchema);