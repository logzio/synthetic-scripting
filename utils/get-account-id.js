const AWS = require('aws-sdk');
const { logger } = require('./logger');
/**
 * Function return Account Id via  AWS SDK using  STS instance.
 * @param  {string} accessKey - AWS Access Key
 * @param  {string} secretKey - AWS Secret Key
 */
exports.getAccountId = async (accessKey, secretKey) => {
    try {
        AWS.config.update({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
        });
        const sts = new AWS.STS();

        return new Promise((resolve, reject) => {
            sts.getCallerIdentity({}, function (err, data) {
                if (err) {
                    logger(err);
                    reject({ error: true, err }); // an error occurred
                } else resolve(data.Account); // successful response
            });
        });
    } catch (err) {
        logger(err);
        return { error: false, err };
    }
};
