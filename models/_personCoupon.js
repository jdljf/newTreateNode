const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/newTreate', { useNewUrlParser: true })

const db = mongoose.connection

const personCouponSchema = mongoose.Schema({
    personId: String,
    coupons: {
        type: Array,
        i: {
            type: Number
        },
        couponsId: String,
        applyed: {
            type: Boolean,
            default: false
        }
    }
})

module.exports = mongoose.model('Person_coupon', personCouponSchema);
