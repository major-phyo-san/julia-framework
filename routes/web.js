var express = require('express');
var router = express.Router();

var authValidator = require('../app/http/middlewares/authValidator');

var LoginController = require('../app/http/controllers/auth/LoginController');
var RegisterController = require('../app/http/controllers/auth/RegisterController');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {appName: 'Julia', activePage: 'Index is active', csrfToken: req.csrfToken()});
});

/* protected route to test auth validator */
router.get('/protected', authValidator.validateWebUser, function(req, res){
    res.send('authenticated user');
});

/* Web authentication routes */
router.get('/login', LoginController.showLoginForm);
router.post('/login', LoginController.login);

/* registration route */
router.get('/register', RegisterController.showRegisterForm);
router.post('/register', RegisterController.registerUser);

router.get('/upload', function(req, res){
    csrfToken = req.csrfToken();
    console.log(csrfToken);
    res.render('upload', {csrfToken: csrfToken});
});

router.post('/upload', function(req, res){
    res.send('uploaded');
});

module.exports = router;