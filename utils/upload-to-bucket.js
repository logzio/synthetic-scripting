const AWS = require('aws-sdk');

exports.uploadFileOnS3 = async (
    fileName,
    fileData,
    access_key,
    secret_key,
    bucket_name,
) => {
    try {
        AWS.config.update({
            accessKeyId: access_key || process.env.ACCESS_KEY,
            secretAccessKey: secret_key || process.env.SECRET_KEY,
        });
        const s3bucket = new AWS.S3();
        const params = {
            Bucket: bucket_name || process.env.BUCKET_NAME,
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
        console.log(err);
        return { error: true, err };
    }
};
