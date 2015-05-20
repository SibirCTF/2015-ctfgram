var express = require('express');
var router = express.Router();
var Like = require('../controllers/LikeController');
var checkAuth = require('../libs/checkAuth');

/* GET users listing. */
router.get('/', checkAuth, Like.set);

module.exports = router;
