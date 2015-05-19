module.exports = function (req, res, next) {
	if(!req.session.user) {
		res.redirect('/login');
		return next(new Error('You are not authorized!'));
	}
    next();
};