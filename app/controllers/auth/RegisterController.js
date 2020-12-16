var envs = require('../../../config/server-env');
var database = require('../../../config/database');
var cryptography = require('../../../utilities/cryptography');
var User = require('../../models/User');

var optionalConnectionString = {
    authSource: 'admin',
    compressors: 'zlib',
    gssapiServiceName: 'mongodb'
}

var serverOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connection = database.makeMongoDBConnection(optionalConnectionString, serverOptions);

var renderContext = {
    appName: envs.NODE_NAME,
};

module.exports.showRegisterForm = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();
    res.render('auth/register', renderContext);
}

module.exports.registerUser = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();
    cryptography.bcrypt(req.body.password, 10, function(hashed){
        var createData = {
            name: req.body.name,
            email: req.body.email,
            password: hashed,
        };
        var user = new User(createData); 
        user.save(function(err, data){
            if(err){
                res.redirect('/register');
            }
            else{
                res.redirect('/login');
            }
        });
    });
   
}