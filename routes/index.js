const express = require('express')
const User = require('../models/users')
const person = require('./person')
const myMessage = require('../models/myMessage')
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
  let body = req.body
  let { person, verificationCode, agree } = body
  console.log(body)

  if (!agree) {
    return res.status(200).json({
      err_code: 1001,
      message: '请同意条款'
    })
  }
  if (!verificationCode || verificationCode.trim().length <= 0) {
    return res.status(200).json({
      err_code: 1002,
      message: '请输入验证码'
    })
  }
  else if (verificationCode !== '123') {
    return res.status(200).json({
      err_code: 1003,
      message: '请输入正确的验证码'
    })
  }
  else if (verificationCode == '123') {
    if (!person.phoneNumber || person.phoneNumber.trim().length <= 0) {
      return res.status(200).json({
        err_code: 1010,
        message: '请输入电话号码'
      })
    }
    else if (!(/^1[34578]\d{9}$/.test(person.phoneNumber))) {
      return res.status(200).json({
        err_code: 1011,
        message: '请输入正确的电话号码'
      })
    }
    if (!person.name || person.name.trim().length <= 0) {
      return res.status(200).json({
        err_code: 1012,
        message: '请输入真实姓名'
      })
    }
    if (!person.idNumber || person.idNumber.trim().length <= 0) {
      return res.status(200).json({
        err_code: 1013,
        message: '请输入身份证号码'
      })
    }
    else if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(person.idNumber))) {
      return res.status(200).json({
        err_code: 1014,
        message: '请输入正确的身份证号码'
      })
    }
    if (!person.province || person.province.trim().length <= 0) {
      return res.status(200).json({
        err_code: 1015,
        message: '请选择省'
      })
    }
    if (!person.area || person.area.trim().length <= 0) {
      return res.status(200).json({
        err_code: 1016,
        message: '请选择市'
      })
    }
    if (!person.city || person.city.trim().length <= 0) {
      return res.status(200).json({
        err_code: 1017,
        message: '请选择区'
      })
    }
    if (!person.address || person.address.trim().length <= 0) {
      return res.status(200).json({
        err_code: 1018,
        message: '请输入详细地址'
      })
    }
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
      new User(person).save(function (err, user, next) {
        if (err) {
          return res.status(500).json({
            err_code: 500,
            message: '服务端出错啦'
          })
        }
        console.log(user);
        let count = 0
        new myMessage({
          personId: user._id,
          message: [
            {
              "index": 0,
              "watched": false,
              "messageType": 0,
              "summary": "欢迎使用新E疗",
              "title": "尊敬的用户：您好！",
              "detail": ["我是内容"],
              "create_Time": user.created_time,
              "messageDetail": []
            }
          ]
        }).save(function (err, myMessage, next) {
          
        })

        
        res.status(200).json({
          err_code: 0,
          message: '注册成功'
        })
      })
    })
  }
})

router.post('/login', function (req, res, next) {
  let body = req.body
  console.log(req.body);

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

// router.post('/checkToken', function (req, res, next) {
//   let token = req.get('Authorization')
//   if (ctx.request.header['authorization']) {
//     let token = ctx.request.header['authorization'].split(' ')[1];
//     //解码token
//     let decoded = jwt.decode(token, 'liaojunfeng');
//     //console.log(decoded);的输出 ：{ user_id: '123123123', iat: 1494405235, exp: 1494405235 }
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
//   // jwt.verify(token, 'liaojunfeng', (err, decode) => {
//   //   if (err) {
//   //     console.log('token不对')
//   //   }
//   //   else {
//   //     console.log('token存在')
//   //   }
//   // })
// })

module.exports = router;
