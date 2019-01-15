const express = require('express')
const questionnaire = require('../models/questionNaire')
const naireanswer = require('../models/naireAnswer')
const user = require('../models/users')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getNaire', checkToken, (token, req, res, next) => {

    // new questionnaire({
    //         question: '我在哪个班',
    //         answer: ['1班', '2班', '3班']
    // }).save((err, naire, next) => {
    //     if (err) {
    //         res.status(500).json({
    //             err_code: 500,
    //             message: '哎呀，出错啦'
    //         })
    //     }

    // })

    questionnaire.find(function (err, naire) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        // console.log(naire)
        res.status(200).json({
            err_code: 0,
            naire: naire
        })
    })
})

router.post('/submitNaireAnswers', checkToken, (token, req, res, next) => {
    console.log(req.body);
    
    naireanswer.findOne({
        person: token.id
    }, function (err, result) {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        
        if (!result) {
            
            new naireanswer({
                person: token.id,
                answers: req.body
            }).save((err, answers, next) => {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '服务器出错啦'
                    })
                }
                if (answers) {
                    user.findByIdAndUpdate(token.id, {
                        $inc: {
                            medicalBeans: 5
                        }
                    }, function (err, user) {
                        if (err) {
                            return res.status(500).json({
                                err_code: 500,
                                message: '服务器出错啦'
                            })
                        }
                    })
                    return res.status(200).send({
                        err_code: 200,
                        message: '提交成功',
                        getMedicalBeans: 5
                    })
                }
            })
        }
        else if (result) {
            return res.status(200).send({
                err_code: 1000,
                message: '您已提交过该问卷了',
            })
        }
    })
    
})

module.exports = router;