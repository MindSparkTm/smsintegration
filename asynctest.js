
var fs = require('fs');

/* non blocking code */

fs.readFile('hello.txt', 'utf8', function(err, contents) {
    console.log(contents);
});

console.log('after calling readFile');