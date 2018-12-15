const express = require('express')
const questionnaire = require('../models/questionNaire')
const naireanswer = require('../models/naireAnswer')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getNaire', (req, res, next) => {

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

router.post('/submitAnswers', checkToken, (decoded, req, res, next) => {
    // 同一用户重复提交怎么办？
    new naireanswer({
        person: decoded.id,
        answers: req.body
    }).save((err, answers, next) => {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        if (answers) {
            res.status(200).send({
                err_code: 200,
                message: '提交成功',
                getMedicalBeans: 5
            })
        }
    })
})

module.exports = router;