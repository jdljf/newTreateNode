const express = require('express')
const curriculum = require('../models/userCurriculum')
const curriculumVideo = require('../models/_curriculumVideo')
const headlineVideo = require('../models/_headlineVideo')
const video = require('../models/video')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getUserCurriculum', checkToken, (token, req, res, next) => {

    // new curriculum({
    //     person: '5c309db612f23c1a98967ce8',
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

    curriculum.findOne({ 'person': token.id }, function (err, curriculum) {
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


router.get('/getHeadlineVideo', checkToken, (token, req, res, next) => {
    let about = []
    // new headlineVideo({
    //     videoId: '5c22d77b14e8c218542299b6'
    // }).save((err, curriculum, next) => {
    //     if (err) {
    //         res.status(500).json({
    //             err_code: 500,
    //             message: '服务器出错啦'
    //         })
    //     }
    // })
    // let num = 1
    // let skipCount = (1 - 1) * packSize
    headlineVideo.find({

    }, {

        }, {
            limit: 10
        }).exec()
        .then((doc) => {
            // console.log(doc);
            about = doc
            let promises = doc.map(item => {
                console.log(item);
                
                return video.findById(
                    item.videoId,
                    {
                        handout: 0,
                        test: 0,
                        collect: 0,
                        common: 0,
                        share: 0,
                        durationTime: 0
                    },
                ).exec()
            })
            return Promise.all(promises)
        })
        .then((list) => {

            if (list.length == about.length) {
                res.status(200).json({
                    err_code: 200,
                    headline: list
                })
            }
        })
})

module.exports = router;