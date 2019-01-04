const express = require('express')
const coupon = require('../models/coupon')
const personCoupon = require('../models/_personCoupon')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getUserApply', checkToken, (token, req, res, next) => {
    console.log(token);
    let coupons = []
    personCoupon.findOne({
        personId: '5c0a391318246606b48ce96b'
    })
        .exec()
        .then((doc) => {
            console.log(doc);

            coupons = doc.coupons

            let promises = doc.coupons.map(function (item) {
                return coupon.findById(item.couponsId).exec()
            })
            return Promise.all(promises)
        })
        .then((apply) => {
            let applyed = coupons.map((item) => {
                delete item.couponsId
                return item
            })
            console.log(applyed);

            res.status(200).json({
                err_code: 200,
                apply: apply,
                applyed: applyed
            })

        })
})

router.post('/receiveApply', (req, res, next) => {

    let { id } = req.body
    console.log(req.body);
    coupon.findById(id, function (err, coupon) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        console.log(coupon);

        if (parseInt(coupon.reaminCount) >= 1) {
            let count = parseInt(coupon.reaminCount) - 1
            console.log(count);
            coupon.updateOne({ "_id": id }, {
                reaminCount: count
            }, function (err, data) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '哎呀，出错啦'
                    })
                }
                res.status(200).json({
                    err_code: 1,
                    message: '领取成功'
                })
            })
        }
        else {
            res.status(200).json({
                err_code: 2,
                message: '优惠券已被领取完'
            })
        }
    })
    // personCoupon.findOneAndUpdate(
    //     {
    //         personId: '5c0a391318246606b48ce96b',
    //         'coupons.couponsId': id
    //     },
    //     {
    //         '$set': {
    //             'coupons.$.applyed': true
    //         }
    //     },
    //     function (err, data) {
    //         if (err) {
    //             return res.status(500).json({
    //                 err_code: 500,
    //                 message: '哎呀，出错啦'
    //             })
    //         }
    //         if (parseInt(data.reaminCount) >= 1) {
    //             let count = parseInt(data.reaminCount) - 1
    //             coupon.findByIdAndUpdate({ _id: id }, { reaminCount: count }, function (err, data) {
    //                 res.status(200).json({
    //                     err_code: 200,
    //                     message: '领取成功'
    //                 })
    //             })
    //         }

    //     }
    // )

    // let data = await coupon.findById(id, function (err, data) {
    //     if (err) {
    //         return res.status(500).json({
    //             err_code: 500,
    //             message: '哎呀，出错啦'
    //         })
    //     }
    //     if (parseInt(data.reaminCount) >= 1) {
    //         let count = parseInt(data.reaminCount) - 1
    //         coupon.findByIdAndUpdate({ _id: id }, { reaminCount: count }, function (err, data) {
    //             res.status(200).json({
    //                 err_code: 200,
    //                 message: '领取成功'
    //             })
    //         })
    //     }
    // })
})

router.get('/getActivity', (req, res, next) => {
    console.log(req.query);
    let id = req.query.id
    coupon.findById(id, function (err, activity) {
        console.log(activity);
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        res.status(200).json({
            err_code: 200,
            activity: activity
        })
    })
})

module.exports = router;