var express = require('express');
var router = express.Router();
var Photo = require('../controllers/PhotoController');
var checkAuth = require('../libs/checkAuth');
var Like = require('../models/like');
/* GET photo page. */
router.get('/:id', checkAuth, function(req, res, next) {
	var id = req.params.id;
	Photo.getById(id, function(item, is_like) {
		Like.findOne({ photo: id, user: req.session.user.id }, function(err, row) {

			if(!item) {
				res.redirect('/');
				return false;
			}
			console.log(item);
			res.render('photo', { 
				title: 'Express',
				page: 'photo',
				item: item,
				is_like: !!row,
				user_id: req.session.user.id
			});
		});
	});
});
router.get('/', checkAuth, function(req, res, next) {
  res.redirect('/');
});
module.exports = router;
