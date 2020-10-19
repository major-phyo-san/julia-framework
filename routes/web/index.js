var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {appName: 'Julia', activePage: 'Index is active'});
});

module.exports = router;
