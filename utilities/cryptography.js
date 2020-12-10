// this module provides shortened cryptographic functionalities based on Node.js crypto module
// created on 10-12-2020

var crypto = require('crypto');

// base64digest() function takes a String parameter
// and return based64 digested form
module.exports.base64digest = function(str){
    var hasher = crypto.createHash('sha256');
    hasher.update(str, 'utf8');
    digestedStr = hasher.digest('base64');
    return digestedStr;
}