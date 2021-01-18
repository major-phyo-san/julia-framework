// this module provides user authentication using Passport
// created on 2020-12-13

const database = require('./database');
const cryptography = require('../utilities/cryptography');
const envs = require('../config/server-env');
const User = require('../app/models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');

var optionalConnectionString = {
    authSource: 'admin',
    compressors: 'zlib',
    gssapiServiceName: 'mongodb'
};

var serverOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

database.makeMongoDBConnection(optionalConnectionString, serverOptions);

module.exports.makePassportAuth = function(){
    passport.use('local', new LocalStrategy(
        { usernameField: 'email' },
        function (email, password, done) {
            // inside local strategy callback
            var errorObj = {"message": "failed to authenticate user"};
            if(envs.NODE_ENV === 'development'){
                console.log('authenticating user using local strtegy');
            }            
    
            // query the database for user with provided credentials
            User.findOne({ email: email }, function (err, user) {
                // database error
                // local strategy returned false
                if (err) {
                    if(envs.NODE_ENV === 'development'){
                        console.log('error occurred in authentication database');
                    } 
                    
                    errorObj["reason"] = "auth db err";
                    return done(errorObj, null);
                }
    
                // user found, provided password needs to be checked
                // against the hashed (bcrypt) password stored in the db
                if (user) {                    
                    // checking the password
                    cryptography.debcrypt(password, user.password, function (match) {
                        // password check 'OK' 
                        // local strategy returned true
                        if (match) {
                            if(envs.NODE_ENV === 'development'){
                                console.log('user found in db');
                                console.log('valid password');
                            }
                            
                            return done(null, user);
                        }
                        // password check 'NOT OK'
                        // local strategy returned false
                        else {
                            if(envs.NODE_ENV === 'development'){
                                console.log('user found in db');
                                console.log('invalid password');
                            }
                            errorObj["reason"] = "invalid password";
                            return done(errorObj, null);
                        }
                    });
                }
    
                // user not found
                // local strategy returned false
                else {
                    if(envs.NODE_ENV === 'development'){
                        console.log('user not found in db');
                    }
                    errorObj["reason"] = "invalid credential";
                    return done(errorObj, null);
                }
    
            });
        }
    ));
    
    passport.serializeUser(function (user, done) {
        // serialize user callback
        // saves the user id to the session file store
        // saves the user id in req.session.passport (req.session.passport.user_id)
        // adds the user obj in req obj (req.user)
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {        
        // de-serialiize user callback
        // query the database for user with the id stored in the passport session (req.session.passport.user_id)
        User.findById(id, function(err, user){
            if(err){
                // user is not restored from db
                done(err, null);
            }
            if(user){
                // user is restored from db
                done(null, user);
            }
        });
    });

    return passport;
}

module.exports.makeJWTAuth = function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, function(err, user){
        var errorObj = {"message": "failed to authenticate user"};
        if (err) {
            if(envs.NODE_ENV === 'development'){
                console.log('error occurred in authentication database');
            } 
            
            errorObj["reason"] = "auth db err";
            errorObj["token"] = null;
            res.status(500).send(errorObj);
        }
        if(!user){
            if(envs.NODE_ENV === 'development'){
                console.log('user not found in db');
            }
            errorObj["reason"] = "invalid credential";
            errorObj["token"] = "";
            res.status(401).send(errorObj);
        }
        if(user){
            cryptography.debcrypt(password, user.password, function(match){
                if (match) {
                    if(envs.NODE_ENV === 'development'){
                        console.log('user found in db');
                        console.log('valid password');
                    }
                    const jwtSignOptions = {
                        expiresIn: "1h"
                    };
                    jwt.sign(user.toJSON(), envs.NODE_KEY, jwtSignOptions, function(err, token){                        
                        res.status(200).send({"message": "authenticated", "token": token});
                    });
                }

                else {
                    if(envs.NODE_ENV === 'development'){
                        console.log('user found in db');
                        console.log('invalid password');
                    }
                    errorObj["reason"] = "invalid password";
                    errorObj["token"] = "";
                    res.status(401).send(errorObj);
                }

            });
        }
    });
}