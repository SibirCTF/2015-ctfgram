var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Auth = require('../controllers/AuthController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', Auth.login);

router.get('/logout', Auth.logout);
module.exports = router;
