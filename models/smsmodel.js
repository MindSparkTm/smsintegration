var mongoose = require('mongoose');


var smsSchema = new mongoose.Schema({
    status: String,
    messageId:String,
    number:String,
    statusCode:String,
    time:String
});

module.exports = mongoose.model('Sms', smsSchema)

