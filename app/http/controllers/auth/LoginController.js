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
        res.status(401).render('errorpages/error', error);
      }
      else {
        // the user is authenticated
        // passport is establishing a login session
        req.login(user, function (err) {
          if (user) {
            // login operation completed
            // user will be assigned as req.passport.user
            req.session.passport = { "user": user._id.toString() };
            req.session.save(function (err) {
              if (err) {
                // error occurred on saving user object in passport
                res.redirect('/login');
              }
              // redirect to wherever the authenticated user should be redirected
              res.redirect('/');
            });
          }
          if (err) {
            // login operation not completed
            // there was no user object
            res.redirect('/login');
          }
        });
      }
    })(req, res, next);
}

module.exports.logout = function(req, res){
  req.logout();
  req.session.regenerate(function(err){
    res.redirect('/login');
  });
}