var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')
var cors = require('cors')

var indexRouter = require('./routes/index');
var personRouter = require('./routes/person')
var naireRouter = require('./routes/naire')
var curriculumRouter = require('./routes/curriculum')
var applyRouter = require('./routes/apply')
var aboutRouter = require('./routes/about')
var subjectRouter = require('./routes/subject')
var mainRouter = require('./routes/main')
var messageRouter = require('./routes/message')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Conten-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use(personRouter);
app.use(naireRouter);
app.use(curriculumRouter);
app.use(applyRouter);
app.use(aboutRouter);
app.use(subjectRouter)
app.use(mainRouter)
app.use(messageRouter)
// 后端页面请求接口时错误的显示
app.use(function(req, res, next) {
  next(createError(404));
});

// 前端页面请求接口时错误发生的数据
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    err_code: 500,
    message: '出错啦'
  })
});

module.exports = app;
