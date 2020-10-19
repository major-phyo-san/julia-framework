var express = require('express');
var handlebars = require('express-handlebars');
var cookieParser = require('cookie-parser');

var createError = require('http-errors');
var devLogger = require('morgan');
var prodLogger = require('express-logger');

var path = require('path');

// import configs
var envs = require('./config/config');

// initialize Express and Handlebars
var app = express();
app.set('env', envs.NODE_ENV);
var hbs = handlebars;

//=======================================================//
// view engine setup with Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/app/views'));
app.engine('hbs', hbs({  
  layoutsDir:path.join(__dirname, '/app/views/layouts'), 
  defaultLayout:'main',
  extname:'.hbs'
}));
// cache templates in production
if(app.get('env') === 'production'){  
  app.enable('view cache');
}
//=======================================================//

// serve static assets
app.use(express.static(path.join(__dirname, 'public')));

//=======================================================//
// setup app features
if(app.get('env') === 'development'){
  app.use(devLogger('dev'));
}
if(app.get('env') === 'test'){
  app.use(devLogger('combined'));
}
if(app.get('env') === 'production'){
  app.use(prodLogger({
    path: __dirname + '/log/request.log'
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//=======================================================//

// import routes
var indexRouter = require('./routes/web/index');
var usersRouter = require('./routes/web/users');

//=======================================================//
// use imported routes
app.use(indexRouter);
app.use(usersRouter);
//=======================================================//

// catch 404 and render the error page
app.use(function(req, res, next) {
  res.status(404);
  var msg = '404 Not found';
  if (req.accepts() == 'application/json') {
    res.send({
      'isSuccess': false,
      'message': 'error occured',
      'error type': msg
    });
  }

  else {
    res.render('errorpages/error', { errorMsg: msg });
  }
});

// catch 500 error and render the error page
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = app.get('env') === 'development' ? err : {};
  
  var statusCode = err.status || 500;
  res.status(statusCode);
  var msg = statusCode + ' Server error';

  if (req.accepts() == 'application/json') {
    res.send({
      'isSuccess': false,
      'message': 'error occured',
      'error type': msg
    });
  }

  else {
    res.render('errorpages/error', { errorMsg: msg });
  }
});

module.exports = app;