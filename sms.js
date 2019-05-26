const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
var request=require('request');

const options = {
    apiKey: '',         // use your sandbox app API key for development in the test environment
    username: '',      // use 'sandbox' for development in the test environment
};
africastalking = require('africastalking')(options);

// Initialize a service e.g. SMS
sms = africastalking.SMS

// Use the service
app.use(bodyParser.urlencoded({
    extended: true
}));
// Send message and capture the response or error
app.use(express.json());

app.post('/smswebhook',function (req,res) {

    fulfillment_id = req.body.fulfillment.id
    order_id = req.body.fulfillment.order_id
    console.log('fulffill',fulfillment_id,order_id)

    if (fulfillment_id && order_id){
        call_order_endpoint(fulfillment_id,order_id,function (err,result) {
            console.log('error',err)
            console.log('result',result)
            if (err==null){
                result = JSON.parse(result)
                phoneNumber = result.order.phone_number
                if (phoneNumber.includes('+254')){
                    phoneNumber = phoneNumber
                }
                if (phoneNumber.startsWith('0')){
                    phoneNumber = phoneNumber.replace('0','')
                    phoneNumber = '+254'+phoneNumber
                }
                payment_status = result.order.payment_status
                total = result.order.total

                if (payment_status=='unpaid'){
                    console.log('pho',phoneNumber,payment_status,total)
                    //trigger sms
                    send_sms(phoneNumber,total,fulfillment_id,'unpaid')
                }

                if (payment_status=='paid'){
                    send_sms(phoneNumber,total,fulfillment_id,'paid')

                }

            }

        })

    }
    res.end('success')

})

function send_sms(phoneNumber,total,shipment_id,payment_status){
    console.log('p',phoneNumber)

    if (payment_status=='unpaid'){
         data = {
            to: phoneNumber,
            message: "Hi there ,Your order has been shipped. Invoice number"+ shipment_id+". Please have MPesa ready, Ksh "+total+", to pay via Buy Goods, Till Number 339233."
        }
    }

    if (payment_status=='paid'){
         data = {
            to: phoneNumber,
            message: "Hi there ,Your order has been shipped. Invoice number "+shipment_id +"Thank you for shopping with MumsVillage"
        }

    }
    sms.send(data)
        .then(resp => {
            var arr = resp.SMSMessageData.Recipients



            var cost = arr[0].cost
            var messageid = arr[0].messageId
            var phonenumber = arr[0].number
            var status_response = arr[0].status
            var status_code = arr[0].statusCode

            console.log('resp',resp)

        })
        .catch(error => {
            console.log('errpr',error)

        })

}
function call_order_endpoint(fulfillment_id,order_id,callback){
     url = 'https://api.tradegecko.com/orders/' + order_id + '.json'
    console.log('url',url)

    request.get({
        url, headers: {
            "Authorization": ''
        }
    }, function (err, res, body) {
        if (err) //TODO: handle err
            if (res.statusCode !== 200) { //etc
                //TODO Do something with response
            }
        console.log('body',body)
         return callback(null,body)
    })


}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get('/',function(req,res){
    res.send('Server running ok')
})
