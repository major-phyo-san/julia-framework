var express = require('express');
var server = express();

handler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = server.get('env') === 'development' ? err : null;
    if(res.locals.error){
        console.error(res.locals.error);
    }

    var statusCode = err.status || 500;
    res.status(statusCode);
    var msg = statusCode + ' Internal server error';

    if (req.accepts() == 'application/json') {
        res.send({
            'success': false,
            'message': 'error occured',
            'error type': msg
        });
    }

    else {
        res.render('errorpages/error', { errorMsg: msg });
    }
}

module.exports = handler;