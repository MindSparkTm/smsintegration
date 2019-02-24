const express = require('express')
const query = require("express").query;
const app = express()
const port = 3000

const options = {
    apiKey: process.env.API_KEY,         // use your sandbox app API key for development in the test environment
    username: process.env.USERNAME,      // use 'sandbox' for development in the test environment
};
africastalking = require('africastalking')(options);

// Initialize a service e.g. SMS
sms = africastalking.SMS

// Use the service

// Send message and capture the response or error


app.post('/', function (req, res) {

    shipmentstatus = req.query.shipmentstatus
    customername = req.query.customername
    mobilenumber = req.query.phonenumber
    amount = req.query.price
    invoicenumber = req.query.invoicenumber

    statuscode = '400'

    if(shipmentstatus && customername && mobilenumber && amount && invoicenumber){
        mobilenumber = '+' + mobilenumber //format the phonenumber to be sent in AT format

        const data = {
            to: mobilenumber,
            message: "Hi there , "+customername+".Your order has been "+shipmentstatus + ", Invoice Number-"+ invoicenumber+". Please have MPesa ready, Ksh "+amount+", to pay via Buy Goods, Till Number 339233."
        }

        console.log(data)

        sms.send(data)
            .then(response => {
                console.log(response);

                response = {'statuscode':'200','response':response}

                res.send(response)

            })
            .catch(error => {

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
    mobilenumber = req.query.phonenumber
    invoicenumber = req.query.invoicenumber

    statuscode = '400'

    if(shipmentstatus && customername && mobilenumber && invoicenumber){
        mobilenumber = '+' + mobilenumber //format the phonenumber to be sent in AT format

        const data = {
            to: mobilenumber,
            message: "Hi there , "+customername+".Your order has been "+shipmentstatus + ", Invoice Number-"+ invoicenumber+". Thank you for shopping with MumsVillage"
        }

        console.log(data)

        sms.send(data)
            .then(response => {
                console.log(response);

                response = {'statuscode':'200','response':response}

                res.send(response)

            })
            .catch(error => {

                error_response = {'statuscode':'500', response:'error'}
                res.send(error_response)
            })

    }

    else{
        bad_request = {'statuscode':'400','response':'Bad request'}
        res.send(bad_request)


    }





});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get('/',function(req,res){
    res.send('Server running ok')
})

