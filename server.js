// express and express handlebars
var express = require('express');
var handlebars = require('express-handlebars');

var cookieParser = require('cookie-parser');

// for HTTP requests logging
var devLogger = require('morgan'); // development logger
var prodLogger = require('express-logger'); // production logger

var createError = require('http-errors');

var path = require('path');

// import configs
var envs = require('./config/server-env');
var credentials = require('./config/credentials');

// initialize Express and Handlebars
var server = express();
server.set('env', envs.NODE_ENV);
var hbs = handlebars;

//=======================================================//
// view engine setup section

// Handlebars setup
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, '/app/views'));
server.engine('hbs', hbs({  
  layoutsDir:path.join(__dirname, '/app/views/layouts'), 
  defaultLayout:'main',
  extname:'.hbs'
}));

// cache templates in production
if(server.get('env') === 'production'){  
  server.enable('view cache');
}
//=======================================================//

// serve static assets
server.use(express.static(path.join(__dirname, 'public')));

//=======================================================//
// server features setup section

if(server.get('env') === 'development'){
  server.use(devLogger('dev'));
}
if(server.get('env') === 'test'){
  server.use(devLogger('combined'));
}
if(server.get('env') === 'production'){
  server.use(prodLogger({
    path: __dirname + '/log/requests.log'
  }));
}

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser(credentials.cookieSecret)); // encrypt cookies with cookieSecret
//=======================================================//

//=======================================================//
// routing section

// import routes
var indexRouter = require('./routes/web/index');
var usersRouter = require('./routes/web/users');

// use imported routes
server.use(indexRouter);
server.use(usersRouter);
//=======================================================//

// catch 404 and render the error page
server.use(function(req, res, next) {
  res.status(404);
  var msg = '404 Not found';
  if (req.accepts() == 'application/json') {
    res.send({
      'success': false,
      'message': 'error occured',
      'error type': msg
    });
  }

  else {
    res.render('errorpages/error', { errorMsg: msg });
  }
});

// catch 500 error and render the error page
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = server.get('env') === 'development' ? err : {};
  
  var statusCode = err.status || 500;
  res.status(statusCode);
  var msg = statusCode + ' Internal server error';

  if (req.accepts() == 'application/json') {
    res.send({
      'success': false,
      'message': 'error occured',
      'error type': msg
    });
  }

  else {
    res.render('errorpages/error', { errorMsg: msg });
  }
});

module.exports = server;