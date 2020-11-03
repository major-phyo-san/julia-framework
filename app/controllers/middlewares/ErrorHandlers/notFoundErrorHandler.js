// this middleware module handles client errors
// created on 27-10-2020

handler = function(req, res, next){
    res.status(404);
    var msg = '404 Not found';
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