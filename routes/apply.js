const express = require('express')
const coupon = require('../models/coupon')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getUserApply', (req, res, next) => {

    // new coupon({
    //     title: '我是很长的标题很长的标题',
    //     beginTime: '2018-10-12 24:00',
    //     endTime: '2018-12-20 24:00',
    //     img: 'ssadad',
    //     reaminCount: '200',
    //     canReceiveCount: '1'
    // }).save((err, coupon, next) => {
    //     if (err) {
    //         res.status(500).json({
    //             err_code: 500,
    //             message: '哎呀，出错啦'
    //         })
    //     }
    //     console.log(coupon);
    // })

    coupon.find(function (err, apply) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        console.log(apply)
        if (apply) {
            res.status(200).json({
                err_code: 0,
                apply: apply
            })
        }
    })
})

router.post('/receiveApply', async (req, res, next) => {

    let { id } = req.body

    let data = await coupon.findById(id, function (err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        if (parseInt(data.reaminCount) >= 1) {
            let count = parseInt(data.reaminCount) - 1
            coupon.findByIdAndUpdate({ _id: id }, { reaminCount: count }, function (err, data) {
                res.status(200).json({
                    err_code: 200,
                    message: '领取成功'
                })
            })
        }
    })
})

module.exports = router;