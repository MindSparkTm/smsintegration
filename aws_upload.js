const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
Userprofile = require('./models/userprofilemodel')

//configuring the AWS environment
AWS.config.update({
    accessKeyId: "",
    secretAccessKey: ""
});


module.exports= {

    fileupload:function (userid,filename,timestamp) {

        var s3 = new AWS.S3();
        filePath = path.join(__dirname, 'public/images/'+filename);

//configuring parameters
        var params = {
            Bucket: 'mumsvillage',
            ACL: 'public-read',
            Key : 'media/'+filename,
            Body : fs.createReadStream(filePath),
        };

        s3.putObject(params, function (err, resp) {
            if (err) {
                console.log("Error: ", err);
            }

            else{
                profileModel = new Userprofile({userid:userid,imageurl:'https://s3.amazonaws.com/mumsvillage/media/'+filename,time:timestamp})

                profileModel.save(function (err, response) {
                    if (err) return console.error(err);
                    console.log(response)
                });

            }

        });
    }
}

