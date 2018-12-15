const express = require('express')
const curriculum = require('../models/userCurriculum')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getUserCurriculum', (req, res, next) => {

    // new curriculum({
    //     person: '5c0a391318246606b48ce96c',
    //     curriculums: {
    //         title: '我是很长的标题我是很长的标题我是很长的标题我是很长的标题我是很长的标题我是很长的标题我是很长的标题我是很长的标题',
    //         totalTime: '200',
    //         lastLearn: '2018-12-12 12:22',
    //         picture: '22',
    //         learnedTime: '50',
    //         progress: '25'
    //     }
    // }).save((err, curriculum, next) => {
    //     if (err) {
    //         res.status(500).json({
    //             err_code: 500,
    //             message: '哎呀，出错啦'
    //         })
    //     }
    // })

    curriculum.findOne({'person': '5c0a391318246606b48ce96c'},function (err, curriculum) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        if (curriculum) {
            res.status(200).json({
                err_code: 0,
                curriculum: curriculum
            })    
        }
    })
})

module.exports = router;