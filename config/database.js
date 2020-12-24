// this module provides database connections for persistent storage
// created on 2020-11-08
// modified on 2020-12-01

const mongoose = require('mongoose');
const envs = require('./server-env');

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
}