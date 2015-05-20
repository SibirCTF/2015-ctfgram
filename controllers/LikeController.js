var Like = require('../models/like');
var Photo = require('../models/photo');
module.exports = {
	set: function(req, res, next) {
		Photo.findById(req.query.photo, function(err, photo) {
			if(!photo)
				res.send({'error': 'can\'t find photo'});
			else
			Like.findOne({ photo: req.query.photo, user: req.session.user.id }, function(err, row) {
				if(!row) {
					var item = new Like({
						photo: req.query.photo,
						user: req.session.user.id
					});

					item.save(function(err) {
						if(err) console.log('can\'t save like', err);
						res.send({'success': true, 'photo': photo});
					});
				}
				else {
					row.remove(function(err) {
						if(err) console.log('can\'t remove like');
						res.send({'success': true, 'photo': photo});
					});
				}
			});
		});
		
	},
	logout: function(req, res, next) {
		req.session.user = false;
		res.redirect('/login');
	}
};