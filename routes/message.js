const express = require('express')
const myMessage = require('../models/myMessage')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const common = require('../routes/common')
const router = express.Router()

// console.log(comment);


router.get('/getMyMessage', checkToken, (token, req, res, next) => {
    console.log(token);

    if (token || token.id !== "") {
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

    myMessage.findOne({
        personId: token.id,
        'message._id': req.query.messageId
    }, {
            'message.$': true
        }, function (err, message) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '哎呀，出错啦'
                })
            }

            myMessage.updateOne(
                { personId: token.id, 'message._id': req.query.messageId },
                {
                    '$set': {
                        "message.$.watched": true
                    }
                },
                function (err, message) {
                    if (err) {
                        return res.status(500).json({
                            err_code: 500,
                            message: '哎呀，出错啦'
                        })
                    }
                })
            res.status(200).json({
                err_code: 0,
                message: message.message[0]
            })
        })
})

router.post('/sureAddComment', checkToken, (token, req, res, next) => {
    console.log(req.body);

    myMessage.findOne({
        personId: token.id,
        'message._id': req.body.commentId
    }, {
            'message.$': true
        }, function (err, message) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务器出错啦'
                })
            }
            // console.log(message);

            myMessage.findOneAndUpdate({
                personId: token.id,
                'message._id': req.body.commentId
            }, {
                    $push: {
                        'message.$.messageDetail': {
                            detail: req.body.personComment,
                            // create_Time: common
                        }
                    }
                }, function (err, data, next) {
                    // if (err) {
                    //     return res.status(500).json({
                    //         err_code: 500,
                    //         message: '服务器出错啦'
                    //     })
                    // }
                })

            return res.status(200).json({
                err_code: 200,
                message: message.message[0]
            })

        })
})

module.exports = router;
