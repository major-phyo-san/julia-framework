// this module provides web sessions storage and retrieval
// created on 11-12-2020

const session = require('express-session');
const stringGenerators = require('../utilities/stringGenerators');
const envs = require('./server-env');
const FileStore = require('session-file-store')(session);

const sessionStorageDir = './storage/framework/sessions';

module.exports.makeMemorySessions = function(){
    var memorySession = session({
        genid: function(req){
            sessionId = stringGenerators.generateUUID();
            return sessionId; // use UUIDs for session Ids
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
            sessionId = stringGenerators.generateUUID();
            return sessionId; // use UUIDs for session Ids
        },
        secret: envs.NODE_KEY,
        resave: false,
        saveUninitialized: true,
        store: new FileStore({
            path: sessionStorageDir
        })
    });

    return fileSession;
}