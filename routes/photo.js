var express = require('express');
var router = express.Router();
var Photo = require('../controllers/PhotoController');
var checkAuth = require('../libs/checkAuth');

/* GET photo page. */
router.get('/:id', checkAuth, function(req, res, next) {
	var id = req.params.id;
	Photo.getById(id, function(item) {
		if(!item) {
			res.redirect('/');
			return false;
		}
		console.log(item);
		res.render('photo', { 
			title: 'Express',
			page: 'photo',
			item: item,
			user_id: req.session.user.id
		});
	});
});
router.get('/', checkAuth, function(req, res, next) {
  res.redirect('/');
});
module.exports = router;
