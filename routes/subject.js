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
    // for (let i = 0; i < 80; i++) {
    //     new video({
    //         "watched" : 432,
    // "publisher" : "同心圆",
    // "canStudy" : 1,
    // "isVideo" : false,
    // "comment" : 427,
    // "collect" : 765,
    // "share" : 543,
    // "handout" : [],
    // "test" : [],
    // "img" : "sdads",
    // "title" : "测试video",
    // "durationTime" : 8,
    // "ReleasedTime" : 231,
    //     }).save()
    // }

    // video.find()
    //     .limit(30)
    //     .skip(150)
    //     .exec()
    //     .then(data => {

    //         console.log(data.length);
    //         for (let i = 0; i < data.length; i++) {
    //             console.log(data[i]._id);

    //                     new clinicalExperiment({
    //                         videoId: data[i]._id
    //                     }).save()
    //                 }
    //     })
    let { dataName, pageNum, pageSize } = req.query
    pageNum = parseInt(pageNum) > 0 ? parseInt(pageNum) : 1;
    pageSize = parseInt(pageSize) > 0 ? parseInt(pageSize) : 8;

    let skip = (pageNum - 1) * pageSize

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


    video.find()
        .exec()
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                // videoNotOfent({
                //     videoId: data[i]._id,
                //     "comment": [
                //         {
                //             "commentName": "廖峻锋",
                //             "content": "222",
                //             "replyPerson": [],
                //         },
                //         {
                //             "commentName": "廖峻锋",
                //             "content": "444",
                //             "replyPerson": []
                //         }
                //     ],
                //     "test": [
                //         {
                //             question: '孩子出生就有并指畸形，什么时候做手术比较好？',
                //             selectType: 1,
                //             trueAnswer: ['A'],
                //             fraction: 20,
                //             answer: [
                //                 '1到2岁',
                //                 '3到4岁',
                //                 '5到6岁',
                //                 '10到12岁'
                //             ]
                //         }
                //     ],
                // }).save()
            }
        })

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

    // subjectHandout.findOne(
    //     { videoId: req.query.id },
    //     function (err, handout) {
    //         if (err) {
    //             return res.status(500).json({
    //                 err_code: 500,
    //                 message: '哎呀，出错啦'
    //             })
    //         }
    //         return res.status(200).json({
    //             err_code: 200,
    //             handout: handout
    //         })
    //     })

    video.findOne({
        '_id': req.query.id
    }, function (err, handout) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        return res.status(200).json({
            err_code: 200,
            handout: handout.handout
        })
    })
})

router.get('/getSubAboutVideo', (req, res, next) => {
    // console.log('sfsfs', req.query.id);
    let result = []
    let about = []
    aboutVideo.findOne(
        { videoId: req.query.id },
        {
            "aboutId": { $slice: [0, 3] }
        }
    )
        .exec()
        .then((doc) => {
            console.log('169', doc);

            about = doc.aboutId
            let promises = doc.aboutId.map(item => {

                return video.findById(
                    item,
                    {
                        handout: 0,
                        test: 0,
                        collect: 0,
                        common: 0,
                        share: 0,
                        durationTime: 0
                    },
                    // { limit: 3 }
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

router.get('/getAboutVideo', checkToken, (token, req, res, next) => {
    console.log(req.query);
    let { pageNum, pageSize } = req.query
    let about = []
    pageNum = parseInt(pageNum) > 0 ? parseInt(pageNum) : 1;
    pageSize = parseInt(pageSize) > 0 ? parseInt(pageSize) : 8;

    let skip = (pageNum - 1) * pageSize
    let start = (pageNum - 1) * pageSize
    let end = pageNum * pageSize

    aboutVideo.findOne(
        { videoId: req.query.id },
        function (err, data) {
            if (data.aboutId.length > 0) {
                aboutVideo.findOne(

                    {
                        "aboutId": { $slice: [start, pageSize] }
                    }
                )
                    .exec()
                    // .limit(pageSize)
                    // .skip(skip)
                    .then((doc) => {
                        console.log(doc);

                        if (doc.aboutId.length > 0) {
                            about = doc.aboutId
                            let promises = doc.aboutId.map(item => {

                                return video.findById(
                                    item,
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
                        }
                    })
                    .then((list) => {

                        if (list.length == about.length) {
                            personCollect.findOne({ personId: token.id }, function (err, person) {
                                if (err) {
                                    return res.status(500).json({
                                        err_code: 500,
                                        message: '服务端出错啦'
                                    })
                                }
                                // console.log(person.collectVideo);             
                                // console.log(list)
                                if (list.length > 0) {
                                    let collecteds = list.map(function (list, index) {
                                        return person.collectVideo.some(function (item, index2) {
                                            return item == list._id
                                        })
                                    })
                                    console.log(collecteds);
                                    res.status(200).json({
                                        err_code: 200,
                                        list,
                                        collecteds
                                    })
                                }
                            })
                        }
                    })
            }
            else {
                return res.status(200).json({
                    err_code: 200,
                    list: [],
                    collecteds: []
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
            })

            video.findByIdAndUpdate(videoId, {
                $inc: {
                    "comment": 1
                }
            }, function (err, video) {

                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: '服务器出错啦'
                    })
                }

                return res.status(200).json({
                    err_code: 200,
                    comment: video.comment,
                    message: '添加成功'
                })
            })
        }
        if (hasVideo) {
            videoNotOfent.findOneAndUpdate({
                videoId: videoId,
            }, {
                    '$push': {
                        comment: {
                            $each: [{
                                commentName: token.name,
                                content: personComment
                            }],
                            $position: 0
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
                    }, function (err, video) {

                        if (err) {
                            return res.status(500).json({
                                err_code: 500,
                                message: '服务器出错啦'
                            })
                        }
                        console.log(video);

                        return res.status(200).json({
                            err_code: 200,
                            comment: video.comment,
                            message: '添加成功'
                        })
                    })

                })
        }
    })
})

router.get('/collectAboutVideo', checkToken, (token, req, res, next) => {
    // console.log(req.query.id);
    let { wantCollect, videoId } = req.query
    console.log(req.query);

    if (token || token.id !== "") {

    }
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
                        message: '服务端出错啦'
                    })
                }
                console.log(user);

                if (!user) {
                    if (wantCollect == true) {
                        new personCollect({
                            personId: token.id,
                            collectVideo: [videoId]
                        })
                            .save(function (err, result) {
                                if (err) {
                                    return res.status(500).json({
                                        err_code: 500,
                                        message: '服务端出错啦'
                                    })
                                }
                            })

                        video.findByIdAndUpdate(videoId, {
                            $inc: {
                                "collect": 1
                            }
                        }, function (err, video) {
                            if (err) {
                                return res.status(500).json({
                                    err_code: 500,
                                    message: '服务器出错啦'
                                })
                            }

                            res.status(200).json({
                                err_code: 200,
                                collect: video.collect,
                                message: '收藏成功'
                            })
                        })
                    }
                }

                if (user) {
                    if (wantCollect == 'true') {
                        console.log('要收藏');

                        personCollect.findOneAndUpdate({
                            personId: token.id,
                        }, {
                                $addToSet: {
                                    collectVideo: videoId
                                }
                            }, function (err, result) {
                                if (err) {
                                    return res.status(500).json({
                                        err_code: 500,
                                        message: '服务端出错啦'
                                    })
                                }
                            })
                        video.findById(videoId, function (err, data) {
                            console.log(data);

                        })
                        video.findByIdAndUpdate(videoId, {
                            $inc: {
                                "collect": 1
                            }
                        }, function (err, video) {

                            if (err) {
                                return res.status(500).json({
                                    err_code: 500,
                                    message: '服务器出错啦'
                                })
                            }
                            console.log(video);
                            let collect = video.collect + 1
                            res.status(200).json({
                                err_code: 200,
                                collect: collect,
                                message: '收藏成功'
                            })
                        })
                    }
                    else if (wantCollect == 'false') {
                        console.log('取消收藏');

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
                            })
                        video.findByIdAndUpdate(videoId, {
                            $inc: {
                                "collect": -1
                            }
                        }, function (err, video) {

                            if (err) {
                                return res.status(500).json({
                                    err_code: 500,
                                    message: '服务器出错啦'
                                })
                            }
                            console.log(video);
                            let collect = video.collect - 1
                            res.status(200).json({
                                err_code: 200,
                                collect: collect,
                                message: '取消收藏成功'
                            })
                        })
                    }
                }
            })
    }
})
// 肠炎的症状有哪些？
// 残胃癌都有哪些表现？
// 表皮囊肿有哪些常见表现？
// 肠梗阻有什么症状？
// 肠结核的分型主要有哪些？
// 大网膜炎有什么症状？


router.get('/getTest', (req, res, next) => {
    // console.log(req.query.id);
    let { index, id } = req.query

    video.findOneAndUpdate({ _id: '5c6567524143192330c986a7' }, {
        '$set': {
            title: '肠炎的症状有哪些？'
        }
    }, function (err, data) {
        console.log(data);

    })
    video.findOneAndUpdate({ _id: '5c6567524143192330c986ab' }, {
        '$set': {
            title: '残胃癌都有哪些表现？'
        }
    }, function (err, data) {
        console.log(data);

    })
    video.findOneAndUpdate({ _id: '5c6567524143192330c986a4' }, {
        '$set': {
            title: '表皮囊肿有哪些常见表现？'
        }
    }, function (err, data) {
        console.log(data);

    })
    video.findOneAndUpdate({ _id: '5c6567524143192330c986a8' }, {
        '$set': {
            title: '肠梗阻有什么症状？'
        }
    }, function (err, data) {
        console.log(data);

    })
    video.findOneAndUpdate({ _id: '5c6567524143192330c986a5' }, {
        '$set': {
            title: '肠结核的分型主要有哪些？'
        }
    }, function (err, data) {
        console.log(data);

    })
    video.findOneAndUpdate({ _id: '5c6567524143192330c986a6' }, {
        '$set': {
            title: '大网膜炎有什么症状？'
        }
    }, function (err, data) {
        console.log(data);

    })

    videoNotOfent.findOneAndUpdate({ videoId: '5c6567544143192330c986f1' }, {
        '$set': {
            test: [
                {
                    "trueAnswer": [
                        "B"
                    ],
                    "answer": [
                        "曲霉菌",
                        "轮状病毒",
                        "溶组织内阿米巴原虫",
                        "白色念珠菌"
                    ],
                    "question": "病毒性肠炎的病因是什么？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "避免腹部受冷",
                        "加强锻炼，提高自身免疫力",
                        "不要吃生冷、坚硬、辛辣及变质的食物",
                        "豆类等产气食物要避免"
                    ],
                    "question": "肠炎生活中应该注意什么？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "B"
                    ],
                    "answer": [
                        "会",
                        "不会",
                    ],
                    "question": "肠炎会传染吗？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "B", "C", "D"
                    ],
                    "answer": [
                        "感染性肠炎",
                        "寄生虫性肠炎",
                        "真菌性肠炎",
                        "病毒性肠炎"
                    ],
                    "question": "肠炎的种类？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "起病急",
                        "恶心",
                        '频繁呕吐腹泻',
                        '发热'
                    ],
                    "question": "肠炎的症状有哪些？",
                    "selectType": 1,
                    "fraction": 20
                }
            ]

        }
    }, function (err, data) {
        // console.log(data);

    })

    videoNotOfent.findOneAndUpdate({ videoId: '5c6567544143192330c98714' }, {
        '$set': {
            test: [
                {
                    "trueAnswer": [
                        "A"
                    ],
                    "answer": [
                        "是",
                        "不是",
                    ],
                    "question": "残胃癌是不是胃癌？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "上腹部闷胀不适",
                        "恶心",
                        "呕吐",
                        "吞咽困难"
                    ],
                    "question": "残胃癌都有哪些表现？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "内镜下切除手术",
                        "切除癌肿及残胃并清扫相关的淋巴结",
                        "姑息性手术",
                        "化疗"
                    ],
                    "question": "怎么治疗残胃癌？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C"
                    ],
                    "answer": [
                        "少量多餐",
                        "少糖及其他小分子了的碳水化合物（甜食）的摄入",
                        "进食后平卧 10～30 分钟",
                        "对正常饮食无影响"
                    ],
                    "question": "做了胃大部分切除术后饮食应注意什么？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A"
                    ],
                    "answer": [
                        "胃镜检查",
                        "照 B 超",
                        '照 CT',
                        '内镜检查'
                    ],
                    "question": "怎么诊断残胃癌？",
                    "selectType": 1,
                    "fraction": 20
                }
            ]
        }
    }, function (err, data) {
        // console.log(data);

    })

    videoNotOfent.findOneAndUpdate({ videoId: '5c6567544143192330c986f5' }, {
        '$set': {
            test: [
                {
                    "trueAnswer": [
                        "A", "B"
                    ],
                    "answer": [
                        "皮肤表面的半球形隆起肿物",
                        "直径大小从 0.5cm 至数厘米不等",
                        "头疼发热",
                        "腹泻"
                    ],
                    "question": "表皮囊肿有哪些常见表现？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "局部炎症反应",
                        "囊肿破裂",
                        "继发感染",
                        "皮肤癌"
                    ],
                    "question": "表皮囊肿会引起哪些并发症？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "D"
                    ],
                    "answer": [
                        "骨科",
                        "传染科",
                        "遗传病科",
                        "皮肤科"
                    ],
                    "question": "表皮囊肿要去看哪个科？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C"
                    ],
                    "answer": [
                        "囊肿破裂、疼痛或感染",
                        "囊肿影响美容",
                        "囊肿快速增大",
                        "肿囊缩小"
                    ],
                    "question": "什么情况下表皮囊肿需积极手术治疗？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "C"
                    ],
                    "answer": [
                        "囊肿影响美容",
                        "囊肿快速增大",
                        '表皮囊肿继发局部炎症反应时',
                        '囊肿破裂、疼痛或感染'
                    ],
                    "question": "什么情况下表皮囊肿不适合立即手术？",
                    "selectType": 1,
                    "fraction": 20
                }
            ]
        }
    }, function (err, data) {
        // console.log(data);

    })

    videoNotOfent.findOneAndUpdate({ videoId: '5c6567544143192330c98718' }, {
        '$set': {
            test: [
                {
                    "trueAnswer": [
                        "A", "B"
                    ],
                    "answer": [
                        "休克",
                        "呼吸不畅",
                        "四肢无力",
                        "高血压"
                    ],
                    "question": "肠梗阻危急情况有什么？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "B", "C", "D"
                    ],
                    "answer": [
                        "癌症",
                        "发生脓毒血症",
                        "在腹腔内发生感染出现腹膜炎",
                        "肠管缺血坏死会引起溃破穿孔",
                    ],
                    "question": "肠梗阻有哪些并发症？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "B"
                    ],
                    "answer": [
                        "胃动脉",
                        "肠系膜动脉",
                        "胃静脉",
                        "肝动脉"
                    ],
                    "question": "肠道管壁是由一些什么血管来供能供氧的",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "C"
                    ],
                    "answer": [
                        "皮肤科",
                        "传染科",
                        "急诊外科",
                        "内科"
                    ],
                    "question": "肠梗阻应该看什么科？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A"
                    ],
                    "answer": [
                        "需要",
                        "不需要",
                    ],
                    "question": "坏死没有功能的肠段需要进行肠切除吗？",
                    "selectType": 1,
                    "fraction": 20
                }
            ]
        }
    }, function (err, data) {
        // console.log(data);

    })

    videoNotOfent.findOneAndUpdate({ videoId: '5c6567544143192330c9871c' }, {
        '$set': {
            test: [
                {
                    "trueAnswer": [
                        "A", "D"
                    ],
                    "answer": [
                        "增生型",
                        "肿瘤型",
                        "先天型",
                        "溃疡型"
                    ],
                    "question": "肠结核的分型主要有哪些？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "开放性肺结核患者咽下含有结核菌的痰液",
                        "正常人与开放性肺结核患者共同饮食而未采取有效隔离措施",
                        "急性粟粒型肺结核的患者，结核杆菌经血行传播",
                        "肠道附近脏器发生结核"
                    ],
                    "question": "肠结核的病因及主要感染途径有哪些？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "B"
                    ],
                    "answer": [
                        "内科",
                        "外科",
                        "结核病院普外科",
                        "普通消化科"
                    ],
                    "question": "怀疑肠结核应该去哪个科室就诊？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "D"
                    ],
                    "answer": [
                        "结肠癌",
                        "胃痛",
                        "克罗恩病",
                        "阑尾炎"
                    ],
                    "question": "肠结核需要与哪些疾病相鉴别？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "肝毒性反应",
                        "胃肠反应",
                        '外周神经炎',
                        '高尿酸血症'
                    ],
                    "question": "服用抗结核药物治疗后会出现哪些不良反应？",
                    "selectType": 1,
                    "fraction": 20
                }
            ]
        }
    }, function (err, data) {
        // console.log(data);

    })

    videoNotOfent.findOneAndUpdate({ videoId: '5c6567544143192330c986fd' }, {
        '$set': {
            test: [
                {
                    "trueAnswer": [
                        "A", "D"
                    ],
                    "answer": [
                        "疼痛部位有时可摸到肿块",
                        "一般会伴随恶心、呕吐、厌食",
                        "四肢无力",
                        "突发的腹痛"
                    ],
                    "question": "大网膜炎有什么症状？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "D"
                    ],
                    "answer": [
                        "通过 CT 排查其他疾病",
                        "通过 B 超排查其他疾病",
                        "照胃镜",
                        "检测血常规"
                    ],
                    "question": "诊断大网膜炎要做什么检查？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A", "B", "C", "D"
                    ],
                    "answer": [
                        "需排查有无血液系统疾病、血管疾病、感染性疾病等",
                        "促进胃肠蠕动",
                        "恢复饮食后需减少食用不容易消化的食物",
                        "增加蔬菜、水果摄入，注意保持大便通畅"
                    ],
                    "question": "大网膜炎在生活中要注意什么？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "B"
                    ],
                    "answer": [
                        "是",
                        "不是",
                    ],
                    "question": "大网膜炎的病因是否已明确？",
                    "selectType": 1,
                    "fraction": 20
                },
                {
                    "trueAnswer": [
                        "A"
                    ],
                    "answer": [
                        "是",
                        "不是",
                    ],
                    "question": "原发性急性大网膜炎是否是急腹症的一种",
                    "selectType": 1,
                    "fraction": 20
                }
            ]
        }
    }, function (err, data) {
        // console.log(data);

    })

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
