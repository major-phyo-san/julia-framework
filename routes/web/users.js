var express = require('express');
var router = express.Router();
var UserController = require('../../app/controllers/UserController');

/* GET users listing. */
router.get('/users', UserController.index);

module.exports = router;
