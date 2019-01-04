const express = require('express')
const User = require('../models/users')
const person = require('./person')
const jwt = require('jsonwebtoken')
const checkToken = require('../token/checkToken')
const md5 = require('blueimp-md5')
const router = express.Router()

// let jsonParser = bodyParser.json();

// 登录时：核对用户名和密码成功后，应将用户名的id作为 JWT_Payload的一个属性
// module.exports = function (user_id) {
//   const token = jwt.sign({
//     user_id: user_id
//   }, 'sinner77', {
//     expiresIn: '3600s'
//   })
//   return token
// }

// module.exports = async (ctx, next) => {
//   if (ctx.rquest.header['authorization']) {
//     let token = ctx.rquest.header['authorization'].split(' ')[1]
//     // 解码token
//     let decoded = jwt.decode(token, 'sinner77')
//     console.log(decoded)
//     if (token&&decoded.exp<=new Date()/1000) {
//       ctx.status = 401
//       ctx.body = {
//         message: 'token过期'
//       }
//     }
//     else {
//       // 如果权限没问题，那么交给下一个控制器处理
//       return next()
//     }
//   }
//   else{
//     ctx.status = 401
//     ctx.body = {
//       message: '没有token'
//     }
//   }
// }



// module.exports = function getToken() {
//   var token = jwt.sign({
//     // 过期时间一个小时
//     data: 'footbar'
//   }, 'shhhhh', { expiresIn: '1h' })
// }


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
})

// var kk = function (req, res, next) {
//   console.log(req.get('Authentication-Token'))
//   // let token = req.get('Authorization')
// // console.log(req.request.header['Authentication-Token']);

//   if (req.get('Authentication-Token')) {
//     let token = req.get('Authentication-Token');
//     console.log(token);

//   //   //解码token
//     let decoded = jwt.decode(token, 'liaojunfeng');
//     // console.log(decoded);//的输出 ：{ user_id: '123123123', iat: 1494405235, exp: 1494405235 }
//     if (token && decoded.exp <= new Date() / 1000) {
//       res.status(401).json({
//         err_code: 10000,
//         message: '哎呀，token过期'
//       })
//     } else {
//       //如果权限没问题，那么交个下一个控制器处理
//       return next();
//     }
//   } else {
//     res.status(401).json({
//       err_code: 10001,
//       message: '没有token'
//     })
//   }
// }

router.get('/first', checkToken, function (req, res, next) {
  res.status(200).send({
    msg: '后台测试'
  })
})



router.post('/register', function (req, res, next) {
  let { person, verification, agree } = req.body
  console.log(person)
  // User.findOne(, function (err, user) {
  //   if (err) {
  //     return next(err)
  //   }
  // })
  User.findOne({
    $or: [
      {
        phoneNumber: person.phoneNumber
      },
      {
        idNumber: person.idNumber
      }
    ]
  }, function (err, hadUser) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: '服务端出错啦'
      })
    }
    if (hadUser) {
      return res.status(200).json({
        err_code: 1,
        message: '用户已存在'
    })
    }
  })
})

router.post('/login', function (req, res, next) {
  let body = req.body
  console.log(req.query);

  User.findOne({
    phoneNumber: body.phoneNumber,
    password: body.password
  }, function (err, user) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '哎呀，出错啦'
      })
    }
    console.log(user)
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: '账号或密码错误'
      })
    }
    else if (user) {
      let token = jwt.sign({
        name: body.name,
        id: user._id
      },
        'liaojunfeng',
        { expiresIn: '1h' }
      )

      console.log(token)
      res.json({
        err_code: 0,
        message: '成功',
        _id: user._id,
        token: token
      })
    }
  })
})

router.post('/checkToken', function (req, res, next) {
  let token = req.get('Authorization')
  if (ctx.request.header['authorization']) {
    let token = ctx.request.header['authorization'].split(' ')[1];
    //解码token
    let decoded = jwt.decode(token, 'liaojunfeng');
    //console.log(decoded);的输出 ：{ user_id: '123123123', iat: 1494405235, exp: 1494405235 }
    if (token && decoded.exp <= new Date() / 1000) {
      res.status(401).json({
        err_code: 10000,
        message: '哎呀，token过期'
      })
    } else {
      //如果权限没问题，那么交个下一个控制器处理
      return next();
    }
  } else {
    res.status(401).json({
      err_code: 10001,
      message: '没有token'
    })
  }
  // jwt.verify(token, 'liaojunfeng', (err, decode) => {
  //   if (err) {
  //     console.log('token不对')
  //   }
  //   else {
  //     console.log('token存在')
  //   }
  // })
})

module.exports = router;
