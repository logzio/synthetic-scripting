const AWS = require('aws-sdk');
const { logger } = require('./logger');
/**
 * @param  {string} fileName
 * @param  {string} fileData
 * @param  {string} access_key
 * @param  {string} secret_key
 * @param  {string} bucket_name
 */
exports.uploadFileOnS3 = async (
    fileName,
    fileData,
    access_key,
    secret_key,
    bucket_name,
) => {
    try {
        AWS.config.update({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
        });
        const s3bucket = new AWS.S3();
        const params = {
            Bucket: bucket_name,
            Key: fileName,
            Body: fileData,
            ContentType: 'application/zip',
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
    } catch (err) {
        logger(err);
        return { error: true, err };
    }
};
