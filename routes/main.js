const express = require('express')
const video = require('../models/video')
const videoNotOfent = require('../models/videoNotOfent')
const informationFlow = require('../models/informationFlow')
const _flowVideo = require('../models/_flowVideo')
const subjectClassify = require('../models/subjectClassify')

const clinical = require('../models/flow/clinical')
const excellentCourse = require('../models/flow/excellentCourse')
const grassrootsTastes = require('../models/flow/grassrootsTastes')
const medicalExamination = require('../models/flow/medicalExamination')
const recommend = require('../models/flow/recommend')
const router = express.Router()

let limitCount = 20

router.get('/getBanner', (req, res, next) => {


    // for (let i = 0; i < 150; i++) {
    //     new video({
    //         "watched": 432,
    //         "publisher": "同心圆",
    //         "canStudy": 1,
    //         "isVideo": false,
    //         "comment": 427,
    //         "collect": 765,
    //         "share": 543,
    //         "handout": [],
    //         "test": [],
    //         "img": "sdads",
    //         "title": "发生尺神经损伤后会有哪些表现?",
    //         "durationTime": 8,
    //         "ReleasedTime": 231,
    //     }).save()
    // }

    // video.find()
    //     .skip(235)
    //     .exec()
    //     .then(data => {

    //         console.log('yyyyy',data._id);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]._id);

    //             new videoNotOfent({
    //                 videoId: data[i]._id
    //             }).save()
    //         }
    //     })

    // video.find()
    //     .limit(30)
    //     .skip(235)
    //     .exec()
    //     .then(data => {

    //         console.log(data.length);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]._id);

    //             new clinical({
    //                 videoId: data[i]._id
    //             }).save()
    //         }
    //     })

    // video.find()
    //     .limit(30)
    //     .skip(265)
    //     .exec()
    //     .then(data => {

    //         console.log(data.length);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]._id);

    //             new excellentCourse({
    //                 videoId: data[i]._id
    //             }).save()
    //         }
    //     })

    // video.find()
    //     .limit(30)
    //     .skip(295)
    //     .exec()
    //     .then(data => {

    //         console.log(data.length);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]._id);

    //             new grassrootsTastes({
    //                 videoId: data[i]._id
    //             }).save()
    //         }
    //     })

    // video.find()
    //     .limit(30)
    //     .skip(325)
    //     .exec()
    //     .then(data => {

    //         console.log(data.length);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]._id);

    //             new medicalExamination({
    //                 videoId: data[i]._id
    //             }).save()
    //         }
    //     })

    // video.find()
    //     .limit(30)
    //     .skip(355)
    //     .exec()
    //     .then(data => {

    //         console.log(data.length);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]._id);

    //             new recommend({
    //                 videoId: data[i]._id
    //             }).save()
    //         }
    //     })

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
    // console.log(dataName);
    // console.log(skip);


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