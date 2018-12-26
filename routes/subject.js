const express = require('express')
const subjectClassify = require('../models/subjectClassify')
const personSubject = require('../models/personSubject')
const subjectHandout = require('../models/subjectHandout')
const video = require('../models/video')
const videoNotOfent = require('../models/videoNotOfent')
const aboutVideo = require('../models/_aboutVideo')
const personTestAns = require('../models/_personTestAns')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

const limitCount = 20

router.get('/getSubject', (req, res, next) => {
    console.log(req.query.id)

    personSubject.findOne(
        { personId: '5c0a391318246606b48ce96b' },
        {
            classify: { $elemMatch: { subjectId: req.query.id } },
            personId: 1,
            _id: 0
        },
        {
            limit: limitCount
        },
        function (err, per) {
            console.log(per);

            subjectClassify.findById(req.query.id, {
                _id: 0,
                name: 0
            },
                {
                    limit: limitCount
                }, function (err, sub) {
                    if (err) {
                        return res.status(500).json({
                            err_code: 500,
                            message: '哎呀，出错啦'
                        })
                    }

                    // console.log(sub)
                    // console.log(per);
                    for (let i = 0; i < sub.detail.length; i++) {
                        sub.detail[i].collect = per.classify[0].subject[i].collect
                        sub.detail[i].collect = per.classify[0].subject[i].collect
                        sub.detail[i].learnTime = per.classify[0].subject[i].learnTime
                        sub.detail[i].totalTime = per.classify[0].subject[i].totalTime
                        sub.detail[i].proportion = per.classify[0].subject[i].proportion
                    }

                    res.status(200).json({
                        err_code: 200,
                        // classify: classify,
                        personSubject: sub
                    })
                })
        })
})

router.get('/getClassify', (req, res, next) => {
    subjectClassify.find({}, { name: 1 }, function (err, cli) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        res.status(200).json({
            err_code: 200,
            classify: cli,
        })
    })
})

router.get('/getSubjectDetail', (req, res, next) => {
    // console.log(req.query);
    const { index, id } = req.query
    subjectClassify.findById(id, function (err, subject) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        // console.log(subject)
        res.status(200).json({
            err_code: 200,
            detail: subject.detail[index]
        })
    })
})

router.get('/getHandout', (req, res, next) => {
    console.log(req.query);

    subjectHandout.findOne(
        { subjectId: req.query.id },
        { subjectId: 0 },
        function (err, handout) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '哎呀，出错啦'
                })
            }
            console.log(handout)
            res.status(200).json({
                err_code: 200,
                handout: handout.handout[req.query.index]
            })
        })
})

router.get('/getSubAboutVideo', (req, res, next) => {
    console.log('sfsfs', req.query.id);
    let result = []
    let about = []
    aboutVideo.find(
        { videoId: req.query.id }
    )
        .exec()
        .then((doc) => {
            console.log(doc);

            about = doc
            let promises = doc.map(item => {

                return video.findById(
                    item.aboutId,
                    {
                        handout: 0,
                        test: 0,
                        collect: 0,
                        common: 0,
                        share: 0,
                        durationTime: 0
                    },
                    { limit: 3 }
                ).exec()
            })
            return Promise.all(promises)
            // console.log(promises);

        })
        .then((list) => {
            console.log(list);

            if (list.length == about.length) {
                res.status(200).json({
                    err_code: 200,
                    list
                })
            }
        })

})

router.get('/getAboutVideo', (req, res, next) => {
    console.log(req.query.id);
    let result = []
    let about = []
    aboutVideo.find(
        { videoId: req.query.id }
    )
        .exec()
        .then((doc) => {
            console.log(doc);

            about = doc
            let promises = doc.map(item => {

                return video.findById(
                    item.aboutId,
                    {
                        handout: 0,
                        test: 0,
                        collect: 0,
                        common: 0,
                        share: 0,
                        watched: 0
                    }
                ).exec()
            })
            return Promise.all(promises)
            // console.log(promises);

        })
        .then((list) => {
            // console.log(list);

            if (list.length == about.length) {
                res.status(200).json({
                    err_code: 200,
                    list
                })
            }
        })
})

router.get('/getSubjectComment', (req, res, next) => {
    // console.log(req.query);
    const { index, id } = req.query

    videoNotOfent.findOne(
        { videoId: id },
        { test: false },
        function (err, comment) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '哎呀，出错啦'
                })
            }
            // console.log(comment)
            res.status(200).json({
                err_code: 200,
                comment
            })
        })
})

router.get('/getTest', (req, res, next) => {
    // console.log(req.query.id);
    let { index, id } = req.query

    videoNotOfent.findOne(
        { videoId: id },
        { comment: false },
        function (err, test) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '哎呀，出错啦'
                })
            }
            // console.log(comment)
            res.status(200).json({
                err_code: 200,
                test
            })
        })
})

router.post('/submitTestAnswers', (req, res, next) => {
    console.log(req.body);
    let { formAnswer, trueCount, answerRes, totalScore, videoId } = req.body

    new personTestAns({
        personId: 'sdada',
        videoId: videoId,
        formAnswer: formAnswer,
        trueCount: trueCount,
        totalScore: totalScore
    }).save((err, data) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        console.log(data);
        res.status(200).json({
            err_code: 200,
            truecount: trueCount,
            totalScore: totalScore,
            message: '李存华'
        })
    })
})


module.exports = router
