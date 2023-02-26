const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const s3 = new AWS.S3();

const renameVideoFile = (sessionId) => {
    let files = fs.readdirSync(path.join(__dirname, '..', '..', 'tmp'));
    const videoExtenstion = '.webm';

    files.forEach((file) => {
        const extensionOfFile = file.substr(file.length - 5);
        if (videoExtenstion === extensionOfFile) {
            fs.renameSync(
                path.join(__dirname, '..', '..', 'tmp', file),
                path.join(__dirname, '..', '..', 'tmp', `${sessionId}.webm`),
            );
        }
    });
};

const uploadVideoToBucket = async (sessionId) => {
    try {
        renameVideoFile(sessionId);
        // process.env.NAME_FUNCTION

        const fileName = `${sessionId}.webm`;
        const fileRoute = path.join(__dirname, '..', '..', 'tmp', fileName);
        const fileData = fs.readFileSync(fileRoute);
        if (readData) {
            const s3bucket = new AWS.S3();
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: `${process.env.FUNCTION_NAME}/${fileName}`,
                Body: fileData,
                ContentType: 'video/webm',
            };

            return new Promise((resolve, reject) => {
                s3bucket.upload(params, function (err, res) {
                    if (err) {
                        reject({ error: true, err });
                    } else {
                        resolve({ error: false, message: 'done uploaded' });
                    }
                });
            });
        } else {
            throw Error('Failed to upload data');
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = uploadVideoToBucket;
