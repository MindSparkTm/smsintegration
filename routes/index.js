var express = require('express');
var router = express.Router();
var uuid = require('uuid');
Users = require('../models/usermodel')
mid = require('../common/requireslogin')

var dateTime = require('node-datetime');
var awsupload = require('../aws_upload')


/* GET home page. */
router.get('/',mid.requiresLogin, function (req, res, next) {
    res.render('test', {'message': 'Welcome  '+req.session.username,'home':'success'});
});

router.post('/', function (req, res, next) {

    userid = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
    user_name = req.body.name
    email = req.body.email
    password = req.body.password
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    userModel = new Users({userid:userid, name: user_name, email: email, password: password, time: formatted})

    userModel.save(function (err, response) {
        if (err) return console.error(err);
        console.log(response)
    });


    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('');
    const msg = {
        to: email,
        from: 'smartsurajit2008@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then(function (fulfilled) {
        console.log(fulfilled);
        awsupload.fileupload(userid,'p.png',formatted)
    })
        .catch(function (error) {
            console.log(error.message);
        });

  res.end('{"response":  "Thank you for registering with us"}')
});

module.exports = router;
