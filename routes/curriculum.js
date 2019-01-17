const express = require('express')
const userCurriculum = require('../models/userCurriculum')
const curriculumVideo = require('../models/_curriculumVideo')
const headlineVideo = require('../models/_headlineVideo')
const video = require('../models/video')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getUserCurriculum', checkToken, (token, req, res, next) => {
    console.log('pppp');

    // new userCurriculum({
    //     person: token.id,
    //     newStudy: true,
    //     curriculums: [{
    //         // img: String,
    //         videoId: '5c22d77b14e8c218542299bf',
    //         // title: String,        
    //         // totalTime: Number,
    //         // picture: String,        
    //         learnedTime: 100,
    //         progress: 10
    //     },{
    //         // img: String,
    //         videoId: '5c22d77b14e8c218542299bc',
    //         // title: String,        
    //         // totalTime: Number,
    //         // picture: String,        
    //         learnedTime: 0,
    //         progress: 0
    //     }]
    // }).save((err, curriculum) => {
    //     if (err) {
    //         res.status(500).json({
    //             err_code: 500,
    //             message: '服务器出错啦'
    //         })
    //     }
    //     console.log(curriculum);

    // })
    
    let cur = []
    userCurriculum.findOne({ 'person': token.id })
        .exec()
        .then(user => {
            console.log(user);
            
            cur = user.curriculums
            let promises = user.curriculums.map((item, index) => {
                return video.findById(item.videoId, {

                }).exec()
            })
            return Promise.all(promises)
        })
        .then(list => {
            console.log(cur);
            
            if (list.length === cur.length) {
                return res.status(200).json({
                    err_code: 200,
                    videos: list,
                    curriculum: cur
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