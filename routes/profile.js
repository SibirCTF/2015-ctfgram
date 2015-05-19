var express = require('express');
var router = express.Router();
var Photo = require('../controllers/PhotoController');
var checkAuth = require('../libs/checkAuth');

/* GET home page. */
router.get('/', checkAuth, function(req, res, next) {
	Photo.listByOwner(req.session.user.id, function(list) {
		res.render('profile', { 
			title: 'Express',
			page: 'profile',
			message: req.flash('info'),
			list: list
		});
	});
});

module.exports = router;
