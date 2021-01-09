//=======================================================//
// dependencies loading section

const http = require('http');
const path = require('path');

// load main dependencies for Express
const express = require('express');
const expressWs = require('express-ws');
const handlebars = require('express-handlebars');

// load cookie-parser, CSRF token guard (csurf) and method-override
const cookieParser = require('cookie-parser');
const csrfGuard = require('csurf');
const methodOverride = require('method-override');

// load web session and auth configs
const session = require('./config/session');
const auth = require('./config/auth');

// for HTTP requests logging
const developmentLogger = require('morgan');
const productionLogger = require('express-logger');
const createError = require('http-errors');

// import configs
const envs = require('./config/server-env');

//=======================================================//

// initialize Express app and create server for the app
const app = express();
app.server = http.createServer(app);

// set app environment
app.set('env', envs.NODE_ENV);

// initialize Express-WS
expressWs(app, app.server);

// initialize Handlebars
const hbs = handlebars;

//=======================================================//
// view engine setup section

// Handlebars setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/app/views'));
app.engine('hbs', hbs({  
  layoutsDir:path.join(__dirname, '/app/views/layouts'), 
  defaultLayout:'main',
  extname:'.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));

// cache templates in production
if(app.get('env') === 'production'){  
  app.enable('view cache');
}

//=======================================================//

// deal with uncaught error
const handlerUncaught = require('./app/http/middlewares/ErrorHandlers/uncaughtErrorHandler');
app.use(handlerUncaught);

//=======================================================//
// app features setup section

// initialieze loggers
const devLogger = developmentLogger('dev');
const testLogger = developmentLogger('combined');
const loggingDir = '/storage/logs/request.log';
const prodLogger = productionLogger({
  path: __dirname + loggingDir
});

// set request logger for each running environment
switch(app.get('env')){
  case 'development':
    app.use(devLogger);
    break;
  case 'test':
    app.use(testLogger);
    break;
  case 'production':
    app.use(prodLogger);
    break;
  default:
    break;
}

// initialize Passport
const passport = auth.makePassportAuth();

// add Express JSON and Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add cookie-parser 
// encrypt cookies with NODE_KEY key from env
app.use(cookieParser(envs.NODE_KEY));

// exclude api routes from checking CSRF
// import api routes
const apiRouter = require('./routes/api');
// use api routes
app.use(apiRouter);

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

// add file-based web sessions
app.use(session.makeFileSessions());

// add Passport authentication
app.use(passport.initialize());
app.use(passport.session());

//=======================================================//

// serve static assets in 'public' directory with '/public' in url
app.get('/public*', function(req, res){
  res.sendFile(process.cwd() + req.url);
});

//=======================================================//
// routing section

// import web routes
const webRouter = require('./routes/web');

// use web routes
app.use(webRouter);

//=======================================================//

//=======================================================//
// error handling section

const handler404 = require('./app/http/middlewares/ErrorHandlers/notFoundErrorHandler');
const handlerGeneral = require('./app/http/middlewares/ErrorHandlers/generalErrorHandler');

// catch 404 and render the error page
app.use(handler404);

// catch 500 and other errors and render the error page
app.use(handlerGeneral);

//=======================================================//

module.exports = app;