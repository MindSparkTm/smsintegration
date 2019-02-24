var dateTime = require('node-datetime');
Sms = require('../models/smsmodel')
var express = require('express');
var router = express.Router();

const options = {
    apiKey: '',         // use your sandbox app API key for development in the test environment
    username: '',      // use 'sandbox' for development in the test environment
};

africastalking = require('africastalking')(options);

// Initialize a service e.g. SMS
sms = africastalking.SMS
/* GET home page. */
router.post('/sendsms', function (req, res, next) {

    shipmentstatus = req.query.shipmentstatus
    customername = req.query.customername
    mobilenumber = req.query.phonenumber
    amount = req.query.price
    invoicenumber = req.query.invoicenumber

    statuscode = '400'

    if (shipmentstatus && customername && mobilenumber && amount && invoicenumber) {
        mobilenumber = '+' + mobilenumber //format the phonenumber to be sent in AT format

        const data = {
            to: mobilenumber,
            message: "Hi there , " + customername + ".Your order has been " + shipmentstatus + ", Invoice Number-" + invoicenumber + ". Please have MPesa ready, Ksh " + amount + ", to pay via Buy Goods, Till Number 339233."
        }

        //console.log(data)

        sms.send(data)
            .then(resp => {

                var arr = resp.SMSMessageData.Recipients

                console.log(arr)


                cost = arr[0].cost
                messageid = arr[0].messageId
                phonenumber = arr[0].number
                status_response = arr[0].status
                status_code = arr[0].statusCode


                var dt = dateTime.create();
                var formatted = dt.format('Y-m-d H:M:S');
                console.log(formatted);

                var smsModel = new Sms({
                    status: status_response,
                    messageId: messageid,
                    number: phonenumber,
                    statusCode: status_code,
                    time: formatted
                })


                smsModel.save(function (err, response) {
                    if (err) return console.error(err);
                    console.log(response)
                });



                response = {'statuscode': '200', 'response': resp}


                res.send(response)

            })
            .catch(error => {

                error_response = {'statuscode': '500', response: error}
                res.send(error_response)
            })

    } else {
        bad_request = {'statuscode': '400', 'response': 'Bad request'}
        res.send(bad_request)


    }


});


module.exports = router;
