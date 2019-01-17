const express = require('express')
const video = require('../models/video')
const informationFlow = require('../models/informationFlow')
const _flowVideo = require('../models/_flowVideo')
const subjectClassify = require('../models/subjectClassify')

const clinical = require('../models/flow/clinical')
const excellentCourse= require('../models/flow/excellentCourse')
const grassrootsTastes = require('../models/flow/grassrootsTastes')
const medicalExamination = require('../models/flow/medicalExamination')
const recommend = require('../models/flow/recommend')
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

    // for (let i = 0; i < 31; i++) {
    //     new clinical({
    //         videoId: '5c22d77b14e8c218542299b5'
    //     }).save()
    // }

    // for (let i = 0; i < 31; i++) {
    //     new excellentCourse({
    //         videoId: '5c22d77b14e8c218542299b5'
    //     }).save()
    // }
    // for (let i = 0; i < 30; i++) {
    //     new grassrootsTastes({
    //         videoId: '5c22d77b14e8c218542299b5'
    //     }).save()
    // }
    // for (let i = 0; i < 25; i++) {
    //     new recommend({
    //         videoId: '5c22d77b14e8c218542299b5'
    //     }).save()
    // }
    // for (let i = 0; i < 16; i++) {
    //     new cliexcellentCoursenical({
    //         videoId: '5c22d77b14e8c218542299b5'
    //     }).save()
    // }

    let { dataName, pageNum, pageSize } = req.query
    pageNum = parseInt(pageNum) > 0 ? parseInt(pageNum) : 1;
    pageSize = parseInt(pageSize) > 0 ? parseInt(pageSize) : 8;

    let skip = (pageNum - 1) * pageSize
    console.log(dataName);
    console.log(skip);
    

    let result = [], data
    if (dataName == 'clinical') {
        data = clinical
    }
    else if (dataName == 'excellentCourse') {
        data = excellentCourse
    }
    else if (dataName == 'grassrootsTastes') {
        data = grassrootsTastes
    }
    else if (dataName == 'medicalExamination') {
        data = medicalExamination
    }
    else if (dataName == 'recommend') {
        data = recommend
    }
    // console.log(data);

    data.find()
        .limit(pageSize)
        .skip(skip)
        .exec()
        .then(classifyVideo => {
            result = classifyVideo
            // console.log(classifyVideo)

            let promises = classifyVideo.map(item => {
                return video.findById(item.videoId).exec()
            })
            return Promise.all(promises)
        })
        .then((videos) => {
            if (videos.length === result.length) {
                res.status(200).json({
                    err_code: 200,
                    videos
                })
            }
        }, (err) => {
            return res.status(500).json({
                err_code: 500,
                message: '服务端出错啦'
            })
        })


    // _flowVideo.find({ flowId: '5c22d9ff8ca8c00e04c06407' }, {
    //     _id: false,
    //     __v: false
    // }, {
    //         limit: limitCount
    //     })
    //     .exec()
    //     .then((flowVideo) => {

    //         flow = flowVideo
    //         let promiese = flowVideo.map((item) => {
    //             return video.findById(item.videoId).exec()
    //         })
    //         return Promise.all(promiese)
    //     })
    //     .then((videos) => {
    //         // console.log(videos);
    //         if (videos.length === flow.length) {
    //             res.status(200).json({
    //                 err_code: 200,
    //                 videos
    //             })
    //         }
    //     })
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