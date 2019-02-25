const express = require('express')
const aboutUs = require('../models/aboutUs')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const router = express.Router()

router.get('/getAboutUs', (req, res, next) => {
    aboutUs.findById('5c14698754e27a12041af345', function (err, aboutUs) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '哎呀，出错啦'
            })
        }
        if (aboutUs) {
            res.status(200).json({
                err_code: 200,
                aboutUs: aboutUs
            })
        }
    })
})

module.exports = router;