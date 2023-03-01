const AWS = require('aws-sdk');
const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');

const renameVideoFile = async (sessionId) => {
    try {
        let files = fs.readdirSync(path.join(__dirname, '..', '..', 'tmp'));
        const videoExtenstion = '.mp4';
        const sizeBefore = await promises.stat(
            path.join(__dirname, '..', '..', 'tmp', 'video.mp4'),
        );
        console.log(sizeBefore);
        files.forEach((file) => {
            console.log(file);
            const extensionOfFile = file.substr(file.length - 4);
            if (videoExtenstion === extensionOfFile) {
                fs.renameSync(
                    path.join(__dirname, '..', '..', 'tmp', file),
                    path.join(__dirname, '..', '..', 'tmp', `${sessionId}.mp4`),
                );
            }
        });

        const sizeAfter = await promises.stat(
            path.join(__dirname, '..', '..', 'tmp', `${sessionId}.mp4`),
        );
        console.log(sizeAfter);
    } catch (err) {
        console.log(err);
    }
};

const uploadVideoToBucket = async (sessionId) => {
    try {
        await renameVideoFile(sessionId);

        const fileName = `${sessionId}.mp4`;
        const fileRoute = path.join(__dirname, '..', '..', 'tmp', fileName);
        const file = fs.createReadStream(fileRoute);

        if (file) {
            const s3bucket = new AWS.S3();
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: `${process.env.NAME_FUNCTION}/${fileName}`,
                Body: file,
                ContentType: 'video/mp4',
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
