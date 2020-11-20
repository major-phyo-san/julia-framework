// this module provides storage option for multer file uploads
// created on 08-11-2020

var mongoose = require('mongoose');
var envs = require('./server-env');

var options = {    
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var connection = null;

const primaryConnectionString = envs.DB_CONNECTION + envs.DB_USERNAME + ':' + envs.DB_PASSWORD + '@' + envs.DB_HOST + ':' + envs.DB_PORT + '/' + envs.DB_DATABASE;
const optionalConnectionString = '?authSource=admin&compressors=snappy&gssapiServiceName=mongodb';
const connectionString = primaryConnectionString + optionalConnectionString;

mongoose.connect(connectionString, options).then(function(result){
    connection = result;
}, function(error){
    connection = null;
});

module.exports = connection;