var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var multer = require('multer');
var session = require('express-session');
var checkAuth = require('./libs/checkAuth');

var routes = require('./routes/index');
var login = require('./routes/login');
var profile = require('./routes/profile');
var photo = require('./routes/photo');
var add = require('./routes/add');
var like = require('./routes/like');

var app = express();

app.use(cookieParser('secret'));
app.use(session({secret: 'testtesttets', cookie: { maxAge: 3600000 }}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(checkAuth);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(multer({ 
    dest: './uploads/photo',
    onFileUploadStart: function (file, req, res) {
        console.log(file.fieldname + ' is starting ...')
    }
}));

app.use('/', routes);
app.use('/login', login);
app.use('/profile', profile);
app.use('/photo', photo);
app.use('/add', add);
app.use('/like', like);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

mongoose.connect('mongodb://localhost/ctfgram');



module.exports = app;
