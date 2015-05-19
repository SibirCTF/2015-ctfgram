var User = require('../models/user');

module.exports = {
	login: function(req, res, next) {
		User.findOne({ mail: req.body.mail }, function(err, user) {
			if(!user) {
				console.log('user is not found, create!');
				var user = new User({
					mail: req.body.mail,
					password: req.body.pass
				});

				user.save(function(err) {
					if(err) { console.log('error: can\'t create new user'); }
				});
			}

			if(!user.checkPassword(req.body.pass)) {
				req.flash('info', 'Password is incorrect!');
				res.redirect('/login');
			}
			else {
				req.flash('info', 'Welcome!');
				req.session.user = {
					id: user.id,
					hashesPassword: user.hashesPassword,
				};

				res.redirect('/');
			}
		});
	},
	logout: function(req, res, next) {
		req.session.user = false;
		res.redirect('/login');
	}
};