var express = require('express');
var router = express.Router();

var auth = require('../config/auth');

var authValidator = require('../app/controllers/middlewares/authValidator');

/* GET api index page. */
router.get('/api', function(req, res, next) {
    res.set({
        'Content-Type': 'application/json',
        'Content-Length': '122'
    }).send({message: 'welcome'});    
});

router.post('/api/login', auth.makeJWTAuth);

router.get('/api/protected', authValidator.validateAPIUser, function(req, res){
    res.send({"message": "authenticated user"});
});

module.exports = router;