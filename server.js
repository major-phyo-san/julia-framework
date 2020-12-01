//=======================================================//
// dependencies loading section
var http = require('http');
var path = require('path');

// load main dependencies for Express
var express = require('express');
var expressWs = require('express-ws');
var handlebars = require('express-handlebars');

// load cookie parser, CSRF token guard and method override
var cookieParser = require('cookie-parser');
var csrfGuard = require('csurf');
var methodOverride = require('method-override');

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
// check for value in '_csrf' attribute of hidden inputs
app.use(csrfGuard({cookie: true}));
app.use(function(req, res, next){
  res.locals._csrfToken = req.csrfToken();
  next();
});

// add method override
// check for value in '_method' attribute of hidden inputs
app.use(methodOverride(function(req, res, next){
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
// check 'X-HTTP-Method-Override' in Ajax request headers
app.use(methodOverride('X-HTTP-Method-Override'));

//=======================================================//

// serve static assets in 'public' directory with '/public' in url
app.get('/public*', function(req, res){
  res.sendFile(process.cwd() + req.url);
});

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
var handlerGeneral = require('./app/controllers/middlewares/ErrorHandlers/generalErrorHandler');

// catch 404 and render the error page
app.use(handler404);

// catch 500 and other errors and render the error page
app.use(handlerGeneral);
//=======================================================//

module.exports = app;