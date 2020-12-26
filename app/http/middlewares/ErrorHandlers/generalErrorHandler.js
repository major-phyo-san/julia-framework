// this middleware module handles server errors
// created on 27-10-2020

var express = require('express');
var app = express();

handler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = app.get('env') === 'development' ? err : null;
    if(res.locals.error){
        console.error(res.locals.error);
    }

    var errorCode = err.status || 500;
    var errorMessage = '';
    var err = {};
    res.status(errorCode);
    switch(errorCode){
        case 401:
            errorMessage = 'You are not authroized to view this page';
            break;
        case 402:
            errorMessage = 'Payment required to view this page';
            break;
        case 403:
            errorMessage = 'Page forbidden';
            break;
        case 404:
            errorMessage = 'Page not found, sorry';
            break;
        case 405:
            errorMessage = 'The requested method not allowed for this URL';
            break;
        case 408:
            errorMessage = 'Request timeout';
            break;
        case 500:
            errorMessage = 'Internal server error';
            break;
        case 501:
            errorMessage = 'Page Not implemented for the requested method';
            break;
        case 502:
            errorMessage = 'Bad gateway';
            break;
        case 503:
            errorMessage = 'Service unavailable';
            break;
    }    

    err["errorMessage"] = errorMessage;
    err["errorCode"] = errorCode;
    
    if (req.accepts() == 'application/json') {
        res.send(err);
    }

    else {
        res.render('errorpages/error', err);
    }
}

module.exports = handler;