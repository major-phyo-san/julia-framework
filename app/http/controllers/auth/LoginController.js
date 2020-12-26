var envs = require('../../../../config/server-env');
var database = require('../../../../config/database');
var auth = require('../../../../config/auth');
var passport = auth.makePassportAuth();

var optionalConnectionString = {
    authSource: 'admin',
    compressors: 'zlib',
    gssapiServiceName: 'mongodb'
}

var serverOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

database.makeMongoDBConnection(optionalConnectionString, serverOptions);

var renderContext = {
    appName: envs.NODE_NAME,
};

module.exports.showLoginForm = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();
    res.render('auth/login', renderContext);
}

module.exports.login = function(req, res, next){
    // user logged in
    // the system will try to authenticate the user using passport
    passport.authenticate('local', function(err, user, info){      
      // inside passport authenticate callback
      // err and user parameters indicate the success of authentication
      // err means authentication has failed
      // user means authetication has succeeded
      if(err){
        // the user is not authenticated
        var error = {errorMessage: err.reason, errorCode: "401"};
        if(req.accepts() == 'application/json'){
          res.status(401).send(error);          
        }
        else{
          res.status(401).render('errorpages/error', error);
        }
        
      }
      else{
        // the user is authenticated
        // passport is establishing a login session
        req.login(user, function(err){
          // login operation completed
          // user will be assigned to req.user
          var jsonRes = {"message": "you were authenticated and logged in"};
          if(req.accepts() == 'application/json'){
            res.status(200).send(jsonRes);
          }
          else{
            res.redirect('/');
          }
        });
      }
      
    })(req, res, next);
}