// this middleware module handles client errors
// created on 27-10-2020

handler = function(req, res, next){
    res.status(404);
    var errorCode = 404;
    var errorMessage = 'Page not found, sorry';
    var err = {"errorMessage": errorMessage, "errorCode": errorCode};
    if (req.accepts() == 'application/json') {
      res.send(err);
    }
  
    else {
      res.render('errorpages/error', err);
    }
}

module.exports = handler;