// this module provides database connections for persistent storage
// created on 08-11-2020
// modified on 01-12-2020

var mongoose = require('mongoose');
var envs = require('./server-env');

var connection = null;

module.exports.makeMongoDBConnection = function(optionalConnectionString, serverOptions){
    // MongoDB server credentials from environment variables
    const primaryConnectionString = envs.DB_CONNECTION + envs.DB_USERNAME + ':' + envs.DB_PASSWORD + '@' + envs.DB_HOST + ':' + envs.DB_PORT + '/' + envs.DB_DATABASE + '?';
    // complete connection string will be 'mongodb://{username:password}@hostname:portnumber/dbname?optionalconnectionstring
    const connectionString = primaryConnectionString + new URLSearchParams(optionalConnectionString).toString();    

    mongoose.connect(connectionString, serverOptions).then(function(result){
        connection = mongoose.connection;
    }, function(error){
        connection = null;
    });

    return connection;
}