const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // console.log(req.get('Authentication-Token'))
    // let token = req.get('Authorization')
  // console.log(req.request.header['Authentication-Token']);
  
    if (req.get('Authentication-Token')) {
      let token = req.get('Authentication-Token');
      // console.log(token);
      
    //   //解码token
      let decoded = jwt.decode(token, 'liaojunfeng');
      // console.log(decoded);//的输出 ：{ user_id: '123123123', iat: 1494405235, exp: 1494405235 }
      if (token && decoded.exp <= new Date() / 1000) {
        res.status(401).json({
          err_code: 10000,
          message: '哎呀，token过期'
        })
      } else {
        //如果权限没问题，那么交个下一个控制器处理
        return next(decoded);
      }
    } else {
      res.status(401).json({
        err_code: 10001,
        message: '没有token'
      })
    }
  }