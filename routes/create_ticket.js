var express = require('express');
var tickets = require('../models/ticketmodel')
var uuid = require('uuid');
var dateTime = require('node-datetime');
mid = require('../common/requireslogin')

var router = express.Router();
/* GET users listing. */
router.get('/', mid.requiresLogin,function (req, res, next) {
    var tickettype = req.query.tickettype;

    res.render('test.hbs', {'message':'Create a Ticket','form':'success','tickettype': tickettype})
});




router.post('/create',mid.requiresLogin, function (req, res, next) {
    console.log('imageurls', req.body)

    ticketid = uuid.v1();
    tickettype = req.body.tickettype

    title = req.body.title

    description = req.body.description

    createdby = req.body.createdby

    assignee = req.body.assignee

    priority = req.body.priority

    imageurls = req.body.imageurls

    var dt = dateTime.create();
    formatted = dt.format('Y-m-d H:M:S');


    ticketmodel = new tickets.ticket({
        ticketid: ticketid,
        tickettype: tickettype,
        title: title,
        description: description,
        createdby: createdby,
        assignee: assignee,
        priority: priority,
        imageurls: imageurls,
    })


    ticketmodel.save(function (err, response) {
        if (err) {
            console.log('error', err)
            console.log(err)
            res.end('{"response": "Error"}')

        } else {
            console.log(response)
            res.end('{"response": "Success"}')
        }
    });
})

router.get('/test',mid.requiresLogin, function (req, res, next) {
        console.log('testst')
        var tickettype = req.query.tickettype

    tickets.ticketobject(tickettype,function (response) {

        res.render('test.hbs', {'message':'Current Tickets','tickets': response,'table':'success'})

    })
})

router.get('/options', mid.requiresLogin, function (req, res, next) {


        res.render('test.hbs', {'message':'Choose a Ticket','options': 'success'})


})

router.get('/details',mid.requiresLogin, function (req, res, next) {

    var ticketid = req.query.ticketid
    tickets.singleticket(ticketid,function (response) {

        res.render('test.hbs', {'single':'Tickets','ticket': response,'ticketmessage':'Displaying Ticket Details'})


    })

})

router.post('/updateticket',mid.requiresLogin,function (req,res,next) {
    title = req.body.title
    description = req.body.description



    assignee = req.body.assignee

    console.log('a',assignee)
    priority = req.body.priority

    console.log(priority)

    status = req.body.status

    console.log(status)



    tickets.singleticket(req.body.ticketid,function (response) {

        response.title = title;
        response.description = description
        response.priority = priority;
        response.assignee = assignee;
        response.status = status;

        // save the user
        response.save(function(err,ticket) {
            if (err) {

                res.end('{"response": "error"}')
            }
            else {
                res.end('{"response": "success"}')
            }

        });

    })





})


module.exports = router;
