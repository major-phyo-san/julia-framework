//=======================================================//
// dependencies loading section
var http = require('http');
var path = require('path');

// load main dependencies for Express
var express = require('express');
var expressWs = require('express-ws');
var handlebars = require('express-handlebars');

// load cookie parser and CSRF token guard
var cookieParser = require('cookie-parser');
var csrfGuard = require('csurf');

// for HTTP requests logging
var developmentLogger = require('morgan');
var productionLogger = require('express-logger');
var createError = require('http-errors');

// import configs
var envs = require('./config/server-env');

//=======================================================//

// initialize Express app and create server for the app
var app = express();
app.server = http.createServer(app);

// set app environment
app.set('env', envs.NODE_ENV);

// initialize Express-WS
expressWs(app, app.server);

// initialize Handlebars
var hbs = handlebars;

//=======================================================//
// view engine setup section

// Handlebars setup
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

// deal with uncaught error
var handlerUncaught = require('./app/controllers/middlewares/ErrorHandlers/uncaughtErrorHandler');
app.use(handlerUncaught);

// serve static assets
app.use(express.static(path.join(__dirname, 'public')));

//=======================================================//
// app features setup section

if(app.get('env') === 'development'){
  app.use(developmentLogger('dev'));
}
if(app.get('env') === 'test'){
  app.use(developmentLogger('combined'));
}
if(app.get('env') === 'production'){
  app.use(productionLogger({
    path: __dirname + '/storage/logs/requests.log'
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// encrypt cookies with cookie secret key from env
app.use(cookieParser(envs.NODE_COOKIES_SECRET));

// add CSRF token guard to app
app.use(csrfGuard({cookie: true}));
app.use(function(req, res, next){
  res.locals._csrfToken = req.csrfToken();
  next();
});

//=======================================================//

//=======================================================//
// routing section

// import routes
var webRouter = require('./routes/web');
var apiRouter = require('./routes/api');
app.use(webRouter);
app.use(apiRouter);

//=======================================================//

//=======================================================//
// error handling section
var handler404 = require('./app/controllers/middlewares/ErrorHandlers/notFoundErrorHandler');
var handler500 = require('./app/controllers/middlewares/ErrorHandlers/serverErrorHandler');

// catch 404 and render the error page
app.use(handler404);

// catch 500 error and render the error page
app.use(handler500);
//=======================================================//

module.exports = app;