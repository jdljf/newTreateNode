const express = require('express')
const video = require('../models/video')
const informationFlow = require('../models/informationFlow')
const _flowVideo = require('../models/_flowVideo')
const subjectClassify = require('../models/subjectClassify')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

let limitCount = 20

router.get('/getBanner', (req, res, next) => {
    return res.status(200).send({
        err_code: 200,
        banner: [
            '/images/banner1.jpg',
            '/images/banner2.jpg',
            '/images/banner3.jpg'
        ]
    })
})

router.get('/informationFlow', (req, res, next) => {
    let flow = []

    _flowVideo.find({ flowId: '5c22d9ff8ca8c00e04c06407' }, {
        _id: false,
        __v: false
    }, {
            limit: limitCount
        })
        .exec()
        .then((flowVideo) => {

            flow = flowVideo
            let promiese = flowVideo.map((item) => {
                return video.findById(item.videoId).exec()
            })
            return Promise.all(promiese)
        })
        .then((videos) => {
            // console.log(videos);
            if (videos.length === flow.length) {
                res.status(200).json({
                    err_code: 200,
                    videos
                })
            }
        })
})

router.get('/getFlowClassify', (req, res, next) => {
    informationFlow.find(
        {}, {
            __v: false
        },
        function (err, flowClassify) {
            if (err) {
                res.status(500).send({
                    err_code: 500,
                    message: '哎呀，出错啦'
                })
            }
            res.status(200).send({
                err_code: 200,
                flowClassify
            })
        })
})

router.get('/getMainSubjectClassify', (req, res, next) => {
    subjectClassify.find(
        {}, {
            __v: false
        },
        function (err, subClassify) {
            if (err) {
                res.status(500).send({
                    err_code: 500,
                    message: '哎呀，出错啦'
                })
            }
            res.status(200).send({
                err_code: 200,
                subClassify
            })
        })
})

module.exports = router;