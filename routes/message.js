const express = require('express')
const myMessage = require('../models/myMessage')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getMyMessage', checkToken, (token, req, res, next) => {
    console.log(token);

    if (token || token._id !== "") {
        console.log(token.id);

        myMessage.findOne({ personId: token.id }, function (err, message) {
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
    }

})

router.get('/getMyMessageDetail', checkToken, (token, req, res, next) => {
    console.log(req.query);
    let index = parseInt(req.query.index)
    console.log('消息详情');


    // myMessage({
        
    //         "message" : [ 
    //             {
    //                 "watched" : false,
    //                 "messageType" : 0,
    //                 "summary" : "您刚刚获得的医豆到账啦",
    //                 "title" : "我是标题",
    //                 "detail" : "我是内容",
    //                 "createTime" : "2019-12-12",
    //                 "messageDetail" : [ 
    //                     {
    //                         "detail" : "我是回复1",
    //                         "createTime" : "2019-12-14"
    //                     }
    //                 ]
    //             }, 
    //             {
    //                 "watched" : false,
    //                 "messageType" : 1,
    //                 "summary" : "您刚刚获得的医豆到账啦",
    //                 "title" : "我是标题",
    //                 "detail" : "我是内容",
    //                 "createTime" : "2019-12-12",
    //                 "messageDetail" : [ 
    //                     {
    //                         "detail" : "我是回复2",
    //                         "createTime" : "2019-12-14"
    //                     }
    //                 ]
    //             }
    //         ],
    //         "personId" : "5c0a391318246606b48ce96a",
    //         "__v" : 0
        
    // }).save(function (err, data) {
    //     console.log(data);
        
    // })

    myMessage.findOne({ personId: token.id }, function (err, message) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        console.log(message);
        
        var arrIndex = 'message.0.watched'
        console.log(arrIndex);

        myMessage.updateOne(
            { personId: token.id, 'message.index': index},
            {
                '$set':{
                    "message.$.watched": true
                }
            }, function (err, message) {
                console.log(message);
            })

        res.status(200).json({
            err_code: 0,
            message: message.message[index]
        })

    })
})

module.exports = router;
