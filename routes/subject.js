const express = require('express')
const subjectClassify = require('../models/subjectClassify')
const personSubject = require('../models/personSubject')
const subjectHandout = require('../models/subjectHandout')
const video = require('../models/video')
const videoNotOfent = require('../models/videoNotOfent')
const aboutVideo = require('../models/_aboutVideo')
const personTestAns = require('../models/_personTestAns')
const personCollect = require('../models/_personCollect')
const medicalHumanity = require('../models/_medicalHumanity')
const medicalComputer = require('../models/_medicalComputer')
const westernMedicine = require('../models/_westernMedicine')
const chineseMedicine = require('../models/_chineseMedicine')
const publicHealth = require('../models/_publicHealth')
const clinicalExperiment = require('../models/_clinicalExperiment')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

const limitCount = 20

router.get('/getSubject', (req, res, next) => {
    // console.log(req.query)
    // for (let i = 0; i < 20; i++) {
    //     new medicalHumanity({
    //         videoId: '5c22d77b14e8c218542299b7'
    //     }).save()
    // }

    let { dataName, pageNum, pageSize } = req.query
    pageNum = parseInt(pageNum) > 0 ? parseInt(pageNum) : 1;
    pageSize = parseInt(pageSize) > 0 ? parseInt(pageSize) : 8;

    let skip = (pageNum - 1) * pageSize
    console.log(dataName);
    console.log(skip);


    let result = [], data
    if (dataName == 'medicalHumanity') {
        data = medicalHumanity
    }
    else if (dataName == 'medicalComputer') {
        data = medicalComputer
    }
    else if (dataName == 'westernMedicine') {
        data = westernMedicine
    }
    else if (dataName == 'chineseMedicine') {
        data = chineseMedicine
    }
    else if (dataName == 'publicHealth') {
        data = publicHealth
    }
    else if (dataName == 'clinicalExperiment') {
        data = clinicalExperiment
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

router.get('/getClassify', (req, res, next) => {
    subjectClassify.find({}, function (err, classify) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '服务端出错啦'
            })
        }
        res.status(200).json({
            err_code: 200,
            classify: classify,
        })
    })
})

router.get('/getSubjectDetail', checkToken, (token, req, res, next) => {
    const { id } = req.query
    console.log(id);

    video.findById(id, function (err, subject) {
        let collectedVideo
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '服务器出错啦'
            })
        }
        if (subject) {
            personCollect.findOne({
                personId: token.id
            }, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '服务器出错啦'
                    })
                }

                if (user) {
                    collectedVideo = user.collectVideo.some((item) => {
                        return item == subject._id
                    })
                    
                    res.status(200).json({
                        err_code: 200,
                        detail: subject,
                        collectedVideo: collectedVideo
                    })
                }
            })
        }

    })
})

router.get('/getHandout', (req, res, next) => {

    subjectHandout.findOne(
        { videoId: req.query.id },
        function (err, handout) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '哎呀，出错啦'
                })
            }
            return res.status(200).json({
                err_code: 200,
                handout: handout
            })
        })
})

router.get('/getSubAboutVideo', (req, res, next) => {
    // console.log('sfsfs', req.query.id);
    let result = []
    let about = []
    aboutVideo.find(
        { videoId: req.query.id }
    )
        .exec()
        .then((doc) => {
            // console.log(doc);

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

            if (list.length == about.length) {
                res.status(200).json({
                    err_code: 200,
                    list
                })
            }
        })

})

router.get('/getAboutVideo', (req, res, next) => {
    // console.log(req.query.id);
    let result = []
    let about = []
    aboutVideo.find(
        { videoId: req.query.id }
    )
        .exec()
        .then((doc) => {
            // console.log(doc);

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

router.get('/getSubjectComment', checkToken, (token, req, res, next) => {
    // console.log(req.query);
    let { id, pageNum, pageSize } = req.query

    if (token || token.id !== "") {
        // console.log(token.id);
        pageNum = parseInt(pageNum) > 0 ? parseInt(pageNum) : 1;
        pageSize = parseInt(pageSize) > 0 ? parseInt(pageSize) : 8;

        let start = (pageNum - 1) * pageSize
        let end = pageNum * pageSize

        console.log(start);
        console.log(end);

        videoNotOfent.findOne(
            { videoId: id },
            {
                test: false,
                comment: { $slice: [start, pageSize] }
            })
            .exec()
            .then(user => {
                console.log(user);

                if (user) {
                    res.status(200).json({
                        err_code: 200,
                        comment: user.comment
                    })
                }
            }, (err) => {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务端出错啦'
                })
            })
    }
})

router.post('/sureAddVideoComment', checkToken, (token, req, res, next) => {
    // console.log(req.query.id);
    let { personComment, videoId } = req.body
    // console.log(token.name);

    videoNotOfent.findOne({
        videoId: videoId
    }, function (err, hasVideo) {

        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '服务器出错啦'
            })
        }
        if (!hasVideo) {
            new videoNotOfent({
                videoId: videoId,
                comment: [{
                    commentName: '',
                    content: personComment
                }]
            }).save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '服务器出错啦'
                    })
                }
                return res.status(200).json({
                    err_code: 200,
                    message: '添加成功'
                })
            })

            video.findByIdAndUpdate(videoId, {
                $inc: {
                    "comment": 1
                }
            }, function (err, result) {

                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '服务器出错啦'
                    })
                }
            })
        }
        if (hasVideo) {
            videoNotOfent.findOneAndUpdate({
                videoId: videoId,
            }, {
                    '$push': {
                        comment: {
                            commentName: token.name,
                            content: personComment
                        }
                    }
                }, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            err_code: 500,
                            message: '服务器出错啦'
                        })
                    }

                    video.findByIdAndUpdate(videoId, {
                        $inc: {
                            "comment": 1
                        }
                    }, function (err, result) {

                        if (err) {
                            return res.status(500).json({
                                err_code: 500,
                                message: '服务器出错啦'
                            })
                        }
                    })
                    return res.status(200).json({
                        err_code: 200,
                        message: '添加成功'
                    })
                })
        }
    })
})

router.get('/wantToCollectVideo', checkToken, (token, req, res, next) => {
    // console.log(req.query.id);
    let { wantCollect, videoId } = req.query
    console.log(token);
    console.log(req.query);

    if (token || token.id !== "") {
        personCollect.findOne(
            {
                personId: token.id
            },
            function (err, user) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '哎呀，出错啦'
                    })
                }
                console.log(user);

                if (!user) {
                    if (wantCollect == true) {
                        new personCollect({
                            personId: token.id,
                            collectVideo: [videoId]
                        })
                            .save(function (err, suc) {
                                if (err) {
                                    return res.status(500).json({
                                        err_code: 500,
                                        message: '服务端出错啦'
                                    })
                                }
                                // console.log(comment)
                                res.status(200).json({
                                    err_code: 200,
                                    suc
                                })
                            })
                    }
                }

                if (user) {
                    if (wantCollect == 'true') {
                        personCollect.findOne({
                            $and: [
                                { personId: token.id, },
                                { collectVideo: { $in: [videoId] } }
                            ]
                        }, function (err, collectedVideo) {
                            if (err) {
                                return res.status(500).json({
                                    err_code: 500,
                                    message: '服务端出错啦'
                                })
                            }

                            if (!collectedVideo) {
                                personCollect.findOneAndUpdate({
                                    personId: token.id,
                                }, {
                                        $push: {
                                            collectVideo: videoId
                                        }
                                    }, function (err, result) {
                                        if (err) {
                                            return res.status(500).json({
                                                err_code: 500,
                                                message: '服务端出错啦'
                                            })
                                        }
                                        console.log(result)
                                        res.status(200).json({
                                            err_code: 200,
                                            message: '收藏成功'
                                        })
                                    })
                            }

                            if (collectedVideo) {
                                res.status(200).json({
                                    err_code: 200,
                                    message: '该视频已收藏'
                                })
                            }
                        })

                    }
                    else if (wantCollect == 'false') {

                        personCollect.findOneAndUpdate({
                            personId: token.id
                        }, {
                                $pull: {
                                    collectVideo: videoId
                                }
                            }, function (err, result) {
                                if (err) {
                                    return res.status(500).json({
                                        err_code: 500,
                                        message: '服务端出错啦'
                                    })
                                }
                                console.log(result)
                                res.status(200).json({
                                    err_code: 200,
                                    message: '取消收藏成功'
                                })
                            })
                    }
                }
            })
    }



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
