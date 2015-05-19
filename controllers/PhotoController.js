var Photo = require('../models/photo');
var fs = require('fs');
var ExifImage = require('exif').ExifImage;

module.exports = {
	add: function(req, res, next) {
		if(!req.body.geo) req.body.geo = '';
		if(!req.body.descr) req.body.descr = '';

		var supportMimeTypes = ['image/jpg', 'image/jpeg'];
		var file = req.files.photo;
		var geoInfo = req.body.geo;

		if(supportMimeTypes.indexOf(file.mimetype) == -1) {
			fs.unlink('./' + file.path);
			req.flash('info', 'Error! Photo is not added!')
    		res.redirect('/add');
    		return false;
        }

	    new ExifImage({ image : file.path }, function (error, exifData) {
	    	console.log(error, exifData);
	    	if(error) 
	    		return false;
	    	console.log(Object.keys(exifData.image).length);
			if(Object.keys(exifData.image).length) {
				console.log('ExifData');
				var gps = exifData.gps;
	        	geoInfo = gps.GPSLongitudeRef + gps.GPSLongitude.join() + gps.GPSLatitudeRef + gps.GPSLatitude.join();
			}
				        

	        var photo = new Photo({
				url: file.path.replace('uploads/', ''),
				geo: geoInfo,
				description: req.body.descr,
				owner: req.session.user.id
			});

			photo.save(function(err) {
				if(err) { console.log('error: can\'t add photo'); }
			});
	    });
		

		req.flash('info', 'Photo added!')

		res.redirect('/');

	},
	list: function(callback) {
		var photo = Photo.find({}, function(err, list) {
			if(err) 
				callback({});

			callback(list.reverse());
		});
	},
	listByOwner: function(user_id, callback) {
		var photo = Photo.find({ owner: user_id }, function(err, list) {
			if(err) 
				callback({});
			callback(list.reverse());
		});
	},
	getById: function(id, callback) {
		var photo = Photo.findById(id, function(err, item) {
			if(err) 
				callback(false);
			callback(item);
		});
	}
};