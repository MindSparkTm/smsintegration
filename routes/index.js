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
