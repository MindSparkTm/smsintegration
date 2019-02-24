var mongoose = require('mongoose');

var exports = module.exports = {};

var ticketSchema = new mongoose.Schema({
    ticketid:String,
    tickettype: String,
    title:String,
    description:String,
    createdby:String,
    assignee:String,
    priority:String,
    status:{type:String, default: 'created'},
    imageurls:Object,
    time : { type : Date, default: Date.now }
});

     _tickets = mongoose.model('tickets', ticketSchema)


     exports.ticketobject = function (tickettype,callback) {

         _tickets.find({'tickettype': tickettype},function (err, tickets) {
             if (err) {
                 console.log(err)

                 return callback(err)
             } else {

                 console.log(tickets.length)

                 return callback(tickets);


             }

         })

     }



exports.singleticket = function (ticketid,callback) {

    _tickets.findOne({'ticketid': ticketid},function (err, ticket) {
        if (err) {
            console.log(err)

            return callback(err)
        } else {

            console.log(ticket)


            return callback(ticket);


        }

    })

}


exports.ticket =mongoose.model('tickets', ticketSchema)

