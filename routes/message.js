const express = require('express')
const myMessage = require('../models/myMessage')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getMyMessage', (req, res, next) => {
    
    // new myMessage({
    //     personId: 'dsada',
    //     message: [{
    //         watched: false,
    //         messageType: 0,
    //         messageDetail: [{
    //             detailType: 0,
    //             title: "我是标题",
    //             detail: '大家好，我是消息内容!',
    //             createTime: '2019-12-12',
    //         },{
    //             detailType: 1,
    //             title: "我的回复",
    //             detail: '大家好，我是消息内容!',
    //             createTime: '2019-12-13',
    //         }]
    //     }]
    // }).save((err, coupon, next) => {
    //     if (err) {
    //         res.status(500).json({
    //             err_code: 500,
    //             message: '哎呀，出错啦'
    //         })
    //     }
    //     console.log(coupon);
    // })

    myMessage.findOne({personId: '5c0a391318246606b48ce96b'},function (err, message) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        console.log(message)
        if (message) {
            res.status(200).json({
                err_code: 0,
                message
            })
        }
    })
})

router.get('/getMyMessageDetail', (req, res, next) => {
    console.log(req.query);
    let index = req.query.index
    console.log('消息详情');

    myMessage.findOne({personId: '5c0a391318246606b48ce96b'},function (err, message) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        console.log(message)
        if (message) {
            res.status(200).json({
                err_code: 0,
                message: message.message[index]
            })
        }
    })
})

module.exports = router;