// Load the AWS SDK, fs and path modules for Node.js
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
// Set the region
AWS.config.update({region: "us-west-1"})

// Create S3 service object
s3 = new AWS.S3({apiVersion: "2006-03-01"});

// Call S3 to retrieve upload file to specified bucket
let uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
const file = process.argv[3];

// Configure the file stream and obtain the upload parameters
const fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
    console.log('File', err);
});
uploadParams.Body = fileStream;
uploadParams.Key = path.basename(file);

// Call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Upload success", data.Location);
    }
});