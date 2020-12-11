// this module provides web sessions storage and retrieval
// created on 11-12-2020

const session = require('express-session');
const stringGenerators = require('../utilities/stringGenerators');
const envs = require('./server-env');
const FileStore = require('session-file-store')(session);

module.exports.makeMemorySessions = function(){
    var memorySession = session({
        genid: function(req){
            return stringGenerators.generateUUID(); // use UUIDs for session Ids
        },
        secret: envs.NODE_KEY,
        resave: false,
        saveUninitialized: true
    });

    return memorySession;
}

module.exports.makeFileSessions = function() {
    var fileSession = session({
        genid: function(req){
            return stringGenerators.generateUUID();
        },
        secret: envs.NODE_KEY,
        resave: false,
        saveUninitialized: true,
        store: new FileStore({
            path: '../storage/framework/sessions'
        })
    });

    return fileSession;
}