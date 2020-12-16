var express = require('express');
var router = express.Router();

var LoginController = require('../app/controllers/auth/LoginController');
var RegisterController = require('../app/controllers/auth/RegisterController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {appName: 'Julia', activePage: 'Index is active'});
});

/* authentication and registration */
router.get('/login', LoginController.showLoginForm);
router.post('/login', LoginController.login);
router.get('/register', RegisterController.showRegisterForm);
router.post('/register', RegisterController.registerUser);

module.exports = router;