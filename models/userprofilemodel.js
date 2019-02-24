var mongoose = require('mongoose');


var userprofileSchema = new mongoose.Schema({
    userid: String,
    imageurl:String,
    time:String
});

module.exports = mongoose.model('Userprofile', userprofileSchema)

