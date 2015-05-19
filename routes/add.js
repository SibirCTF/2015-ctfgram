var express = require('express');
var router = express.Router();
var Photo = require('../controllers/PhotoController');
var checkAuth = require('../libs/checkAuth');

/* GET users listing. */
router.get('/', checkAuth, function(req, res, next) {
  res.render('add', { title: 'Express', page: 'add', message: req.flash('info') });
});

router.post('/', checkAuth, Photo.add);

module.exports = router;
