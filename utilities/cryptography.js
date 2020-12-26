// this module provides shortened cryptographic functionalities based on Node.js crypto module
// and other third party crypto modules
// created on 10-12-2020

const crypto = require('crypto');
try{
    const bcrypt = require('bcrypt');
}
catch(error){
    const bcrypt = require('bcryptjs');
}

// base64digest() function takes a String parameter
// and return based64 digested form
module.exports.base64digest = function(str){
    var hasher = crypto.createHash('sha256');
    hasher.update(str, 'utf8');
    digestedStr = hasher.digest('base64');
    return digestedStr;
}

// bcrypt() function takes a String and bcrypt it
// and return a callback
module.exports.bcrypt = function(str, rounds=null, bcrypter){
    if(rounds === null){
        rounds = 10;
    }
    bcrypt.genSalt(rounds, function(err, salt){
        bcrypt.hash(str, salt, function(err, hashed){
            if(!err){
                bcrypter(hashed);
            }
            else{
                bcrypter('');
            }
        });
    });
}

// debcrypt() function takes a bcrypted String and a plain text String
// compares them and returns a callback
module.exports.debcrypt = function(str, bcryptedStr, matcher){
    bcrypt.compare(str, bcryptedStr, function(err, result){
        if(result){
            matcher(true);
        }
        else{
            matcher(false);
        }
    });
}