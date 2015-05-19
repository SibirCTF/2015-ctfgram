var express = require('express');
var router = express.Router();
var Photo = require('../controllers/PhotoController');
var checkAuth = require('../libs/checkAuth');

/* GET home page. */
router.get('/', checkAuth, function(req, res, next) {
	
	Photo.list(function(list) {
		res.render('home', { title: 'Express', page: 'home', message: req.flash('info'), list: list });	
	});
});

module.exports = router;
