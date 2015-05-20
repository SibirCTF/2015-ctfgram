var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Like = new Schema({
    user: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Like', Like);