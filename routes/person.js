const express = require('express');
const User = require('../models/users')
const checkToken = require('../token/checkToken')
const receiveAddress = require('../models/receiveAddress')
const router = express.Router();

/* GET users listing. */
router.get('/getPersonMessage', function (req, res, next) {
  console.log('personmessage');

  User.findOne({ name: 'bbb' }, function (err, user) {
    console.log(user)
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '哎呀，出错啦'
      })
    }

    res.status(200).json(user)
  })
});

router.post('/getPersonPhoneNum', function (req, res, next) {
  let body = req.body
  User.findOne(body, function (err, user) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '哎呀，出错啦'
      })
    }

    res.status(200).json({
      err_code: 200,
      id: user._id,
      phoneNumber: user.phoneNumber
    })
  })
});

router.get('/getChangePerMes', function (req, res, next) {
  let query = req.query
  User.findById('5c0a391318246606b48ce96b', function (err, perMes) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '哎呀，出错啦'
      })
    }

    res.status(200).json({
      err_code: 200,
      perMes
    })
  })
});

router.post('/verifyIdentity', function (req, res, next) {
  let { phoneNumber, verificationCode } = req.body
  console.log(req.body);
  console.log(req.body.verificationCode);
  if (!verificationCode || verificationCode.replace(/^\s+|\s+$/g, '').length <= 0) {
    return res.status(200).json({
      err_code: 1,
      message: '请填写验证码'
    })
  }
  if (verificationCode.replace(/^\s+|\s+$/g, '') === '123') {
    User.findById('5c0a391318246606b48ce96b', function (err, perMes) {
      if (err) {
        res.status(500).json({
          err_code: 500,
          message: '哎呀，出错啦'
        })
      }

      res.status(200).json({
        err_code: 0,
        message: '验证码正确'
      })
    })
  }
  else {
    res.status(200).json({
      err_code: 2,
      message: '验证码错误'
    })
  }
});

router.post('/sureChangePhone', function (req, res, next) {
  let { newPhoneNumber, verificationCode } = req.body
  console.log(req.body);
  console.log(req.body.verificationCode);

  if (!newPhoneNumber || newPhoneNumber.replace(/^\s+|\s+$/g, '').length <= 0) {
    return res.status(200).json({
      err_code: 2,
      message: '请填写手机号'
    })
  }
  if (!verificationCode || verificationCode.replace(/^\s+|\s+$/g, '').length <= 0) {
    return res.status(200).json({
      err_code: 1,
      message: '请填写验证码'
    })
  }
  else if (verificationCode.replace(/^\s+|\s+$/g, '') === '123') {

    User.findByIdAndUpdate('5c0a391318246606b48ce96b', {
      phoneNumber: newPhoneNumber
    }, function (err, user) {
      if (err) {
        res.status(500).json({
          err_code: 500,
          message: '哎呀，出错啦'
        })
      }
      res.status(200).json({
        err_code: 200,
        message: '更改成功'
      })
    })

    // User.findById('5c0a391318246606b48ce96b', function (err, perMes) {
    //   if (err) {
    //     res.status(500).json({
    //       err_code: 500,
    //       message: '哎呀，出错啦'
    //     })
    //   }
    //   if (perMes) {
    //     User.update()
    //   }
    //   // res.status(200).json({
    //   //   err_code: 0,
    //   //   message: '验证码正确'
    //   // })
    // })  
  }
  else {
    res.status(200).json({
      err_code: 2,
      message: '验证码错误'
    })
  }
});

router.post('/changePassword', function (req, res, next) {
  let body = req.body
  User.findByIdAndUpdate('5c0a391318246606b48ce96b', {
    passsword: body.o
  }, function (err, user) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '哎呀，出错啦'
      })
    }

    res.status(200).json({
      err_code: 200,
      message: '更新成功'
    })
  })
  User.findByIdAndUpdate('5c0a391318246606b48ce96b', {
    passsword: body.newPassword
  }, function (err, user) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '哎呀，出错啦'
      })
    }

    res.status(200).json({
      err_code: 200,
      message: '更新成功'
    })
  })
});

/**
 * 管理收货地址接口
 */
router.post('/getRecAddresses', checkToken, function (token, req, res, next) {
  console.log(token);

  receiveAddress.findOne(
    { personId: token.id },
    function (err, model) {
      if (err) {
        res.status(500).json({
          err_code: 500,
          message: '哎呀，出错啦'
        })
      }
      console.log(model)
      res.status(200).json({
        err_code: 200,
        address: model.receiveAddresses
      })
    })
});

/**
 * 跳转地址修改页面请求的接口
 */
router.get('/getReceiveAddress', function (req, res, next) {
  // let query = req.params.personId

  // console.log(req)
  let query = '5c0c7716a6caac1440278678'
  receiveAddress.findById(
    query,
    function (err, model) {
      if (err) {
        res.status(500).json({
          err_code: 500,
          message: '哎呀，出错啦'
        })
      }
      console.log(model)
      res.status(200).json({
        err_code: 200,
        address: model.receiveAddresses[0]
      })
    })
});

/**
 * 编辑收货地址
 */
router.post('/editReceiveAddress', function (req, res, next) {
  // let query = req.params.personId
  let body = req.body
  console.log(req.body)
  let query = '5c0c7716a6caac1440278679'
  receiveAddress.updateOne(
    { 'receiveAddresses._id': query },
    {
      '$set': {
        'receiveAddresses.$.receiveName': body.receiveName,
        'receiveAddresses.$.receivePhone': body.receivePhone,
        'receiveAddresses.$.province': body.province,
        'receiveAddresses.$.city': body.city,
        'receiveAddresses.$.area': body.area,
        'receiveAddresses.$.address': body.address,
        'receiveAddresses.$.isDefault': body.isDefault
      }
    },
    function (err, model) {
      if (err) {
        res.status(500).json({
          err_code: 500,
          message: '哎呀，出错啦'
        })
      }
      console.log(model)
      res.status(200).json({
        err_code: 200,
        message: '修改成功'
      })
    })
});


/**
 * 删除收货地址
 */
router.get('/delRecAddresses', function (req, res, next) {
  // let body = req.body
  // console.log(req.body)
  let query = '5c0c7716a6caac1440278678'
  let address_id = '5c0c7716a6caac1440278679'
  receiveAddress.findByIdAndUpdate(
    // { 'receiveAddresses._id': query },
    query,
    {
      '$pull': { 'receiveAddresses': { '_id': address_id } }
    },
    function (err, model) {
      if (err) {
        res.status(500).json({
          err_code: 500,
          message: '哎呀，出错啦'
        })
      }
      console.log('删除成功', model)
      receiveAddress.findById('5c0c7716a6caac1440278678', function (err, data) {
        console.log(data)
      })
      res.status(200).json({
        err_code: 200,
        message: '删除成功'
      })
    })
});



// router.get('/getReceiveAddress', function (req, res, next) {
//   let body = req.query
//   console.log(body)
//   receiveAddress.findByIdAndUpdate(
//     '5c0c7716a6caac1440278678',
//     { $push: {'receiveAddress': body.receiveAddress} },  function (err, model) {
//     console.log(data)
//   })
//   receiveAddress({
//     name: 'ccc',
//     idNummber: '3233',
//     receiveAddresses: {
//       receiveName: '提莫队长',
//       province: '广东',
//       city: '广州',
//       area: '花都',
//       receiveAddress: '华南理工大学广州学院',
//       receivePhone: 13640690732,
//       isDefault: true
//     }
//   }).save(function (err, address, next) {
//     if (err) {
//       return console.log('出错啦')
//     }
//     res.status(200).json({
//       err_code: 0,
//       message: '保存地址ok'
//     })
//   })
// });

module.exports = router;
