var express = require('express');
var router = express.Router();

/* GET api index page. */
router.get('/api', function(req, res, next) {
    res.set({
        'Content-Type': 'application/json',
        'Content-Length': '122'
    }).send({message: 'welcome'});    
});

module.exports = router;