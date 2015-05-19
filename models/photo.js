var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// var Images = new Schema({
//     img: {
//         data: Buffer,
//         contentType: String,
//         required: true
//     },
//     url: { type: String, required: true }
// });

var Photo = new Schema({
    geo: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
    // salt: {
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model('Photo', Photo);