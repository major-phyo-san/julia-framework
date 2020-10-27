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

// deal with uncaught error
var handlerUncaught = require('./app/controllers/middlewares/ErrorHandlers/uncaughtErrorHandler');
server.use(handlerUncaught);

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

server.get('/fail', function(req, res){
  process.nextTick(function(){
    throw new Error('Kaboom');
  });
});

//=======================================================//
// error handling section
var handler404 = require('./app/controllers/middlewares/ErrorHandlers/notFoundErrorHandler');
var handler500 = require('./app/controllers/middlewares/ErrorHandlers/serverErrorHandler');

// catch 404 and render the error page
server.use(handler404);

// catch 500 error and render the error page
server.use(handler500);
//=======================================================//

module.exports = server;