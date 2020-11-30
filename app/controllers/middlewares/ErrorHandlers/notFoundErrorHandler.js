// this middleware module handles client errors
// created on 27-10-2020

handler = function(req, res, next){
    res.status(404);
    var errorCode = 404;
    var errorMessage = 'Page not found, sorry';
    
    if (req.accepts() == 'application/json') {
      res.send({
        'success': false,
        'errorMessage': errorMessage,
        'errorCode': errorCode
      });
    }
  
    else {
      res.render('errorpages/error', { errorMessage: errorMessage, errorCode: errorCode });
    }
}

module.exports = handler;