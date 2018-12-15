const express = require('express')
const aboutUs = require('../models/aboutUs')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getAboutUs', (req, res, next) => {

    // new aboutUs({
    //     content: [
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业',
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业',
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业',
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业',
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业',
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业',
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业',
    //         '只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业'
    //     ]
    // }).save((err, coupon, next) => {
    //     if (err) {
    //         res.status(500).json({
    //             err_code: 500,
    //             message: '哎呀，出错啦'
    //         })
    //     }
    //     console.log(coupon);
    // })

    aboutUs.findById('5c14698754e27a12041af345', function (err, aboutUs) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        console.log(aboutUs)
        if (aboutUs) {
            res.status(200).json({
                err_code: 200,
                aboutUs: aboutUs
            })
        }
    })
})

module.exports = router;