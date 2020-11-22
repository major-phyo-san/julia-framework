var express = require('express');
var router = express.Router();

var UserController = require('../app/controllers/UserController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {appName: 'Julia', activePage: 'Index is active'});
});

/* GET users listing. */
router.get('/user', UserController.index);
router.get('/users', UserController.indexAll);

module.exports = router;