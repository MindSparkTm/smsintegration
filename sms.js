const express = require('express')
const query = require("express").query;
const app = express()
const port = 3000
var dateTime = require('node-datetime');
const fs = require('fs');

const options = {
    apiKey: '',         // use your sandbox app API key for development in the test environment
    username: '',      // use 'sandbox' for development in the test environment
};
africastalking = require('africastalking')(options);

// Initialize a service e.g. SMS
sms = africastalking.SMS

// Use the service

// Send message and capture the response or error

app.get('/smslogs',function (req,res) {

    res.download('smslogs.txt')

})

app.post('/', function (req, res) {

    shipmentstatus = req.query.shipmentstatus
    customername = req.query.customername
    mobilenumber = req.query.phonenumber
    amount = req.query.price
    invoicenumber = req.query.invoicenumber
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    statuscode = '400'

    if(shipmentstatus && customername && mobilenumber && amount && invoicenumber){
        mobilenumber = '+' + mobilenumber //format the phonenumber to be sent in AT format

        const data = {
            to: mobilenumber,
            message: "Hi there , "+customername+".Your order has been "+shipmentstatus + ", Shipment Number-"+ invoicenumber+". Please have MPesa ready, Ksh "+amount+", to pay via Buy Goods, Till Number 339233."
        }

        console.log(data)

        sms.send(data)
            .then(resp => {
                console.log(resp);
                var arr = resp.SMSMessageData.Recipients



                var cost = arr[0].cost
                var messageid = arr[0].messageId
                var phonenumber = arr[0].number
                var status_response = arr[0].status
                var status_code = arr[0].statusCode



                formatted_text = 'statuscode'+"\t"+status_code+"\t"+"recipent_number"+"\t"+phonenumber+"\t"+"cost"+"\t"+cost+"\t"+"messageid"+"\t"+messageid+"\t"+"timeStamp"+"\t"+formatted+"\n"



                fs.writeFile("smslogs.txt", formatted_text,{ flag: "a" }, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                });



                response = {'statuscode':'200','response':resp}




                res.send(response)

            })
            .catch(error => {

                console.log('error',error)

                error_response = {'statuscode':'500', response:'error'}
                res.send(error_response)
            })

    }

    else{
        bad_request = {'statuscode':'400','response':'Bad request'}

        res.send(bad_request)


    }





});

app.post('/pesapal', function (req, res) {

    shipmentstatus = req.query.shipmentstatus
    customername = req.query.customername
   var  mobilenumber = req.query.phonenumber
    invoicenumber = req.query.invoicenumber

    statuscode = '400'
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');

    if(shipmentstatus && customername && mobilenumber && invoicenumber){
        mobilenumber = '+' + mobilenumber //format the phonenumber to be sent in AT format

        const data = {
            to: mobilenumber,
            message: "Hi there , "+customername+".Your order has been "+shipmentstatus + ", Shipment Number-"+ invoicenumber+". Thank you for shopping with MumsVillage"
        }

        console.log(data)

        sms.send(data)
            .then(resp => {
                var arr = resp.SMSMessageData.Recipients



                var cost = arr[0].cost
               var messageid = arr[0].messageId
                var phonenumber = arr[0].number
                var status_response = arr[0].status
               var status_code = arr[0].statusCode



                formatted_text = 'statuscode'+"\t"+status_code+"\t"+"recipent_number"+"\t"+phonenumber+"\t"+"cost"+"\t"+cost+"\t"+"messageid"+"\t"+messageid+"\t"+"timeStamp"+"\t"+formatted+"\n"

                console.log(response);
                fs.writeFile("smslogs.txt", formatted_text, { flag: "a" },function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                });

                response = {'statuscode':'200','response':resp}

                res.end(response)

            })
            .catch(error => {

                error_response = {'statuscode':'500', response:'error'}
                res.end(error_response)
            })

    }

    else{
        bad_request = {'statuscode':'400','response':'Bad request'}
        res.end(bad_request)


    }





});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get('/',function(req,res){
    res.send('Server running ok')
})

