var express = require('express');
var router = express.Router();

var auth = require('../config/auth');

var authValidator = require('../app/http/middlewares/authValidator');

/* GET api index page. */
router.get('/api', function(req, res) {
    res.set({
        'Content-Type': 'application/json'
    }).send({"message": 'welcome'});
});

/* protected route to test auth validator */
router.get('/api/protected', authValidator.validateAPIUser, function(req, res){
    res.send({"message": "authenticated user"});
});

/* API authentication route */
router.post('/api/login', auth.makeJWTAuth);

module.exports = router;