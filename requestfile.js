const request = require('request');


for (var i=0;i<50000;i++){
    test()
}
console.log('test test')


function test() {

    request('https://fenixdb.com/login/?next=/', { json: false }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(res.statusCode);
        console.log(res)
    });

}