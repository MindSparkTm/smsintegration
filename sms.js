const express = require('express')
const query = require("express").query;
const app = express()
const port = 3000

const options = {
    apiKey: '',         // use your sandbox app API key for development in the test environment
    username: '',      // use 'sandbox' for development in the test environment
};
africastalking = require('africastalking')(options);

// Initialize a service e.g. SMS
sms = africastalking.SMS

// Use the service

// Send message and capture the response or error


app.post('/', function (req, res) {

    shipmentstatus = req.query.shipmentstatus
    customername = req.query.name
    mobilenumber = req.query.phonenumber

    console.log("mobilenumber"+mobilenumber)

    statuscode = '400'

    if(shipmentstatus && customername && mobilenumber){
        mobilenumber = '+' + mobilenumber //format the phonenumber to be sent in AT format


        const data = {
            to: mobilenumber,
            message: "I'm a lumberjack and its ok, I work all night and sleep all day"
        }


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


