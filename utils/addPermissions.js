const AWS = require('aws-sdk');
const { PUT_RULE_ROLE_NAME } = require('./constants');
const logger = require('./logger');

/**
 * @param  {string} name - Name of Lambda Function and Name of the Test
 * @param  {string} accessKey - AWS Access Key from AWS Account
 * @param  {string} secretKey - AWS Secret Key from AWS Account
 * @param  {string} region - AWS Region where  need to add permission
 * @param  {string} accountId - AWS Account ID
 */
exports.addPermissions = async (
    name,
    accessKey,
    secretKey,
    region,
    rangeTime,
    accountId,
) => {
    try {
        AWS.config.update({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
        });
        const lambda = new AWS.Lambda({
            region,
        });

        return new Promise((resolve, reject) => {
            const params = {
                Action: 'lambda:InvokeFunction',
                FunctionName: name,
                Principal: 'events.amazonaws.com',
                StatementId: 'my-scheduled-event',
                SourceArn: `arn:aws:events:${region}:${accountId}:rule/${rangeTime}-${PUT_RULE_ROLE_NAME}`,
            };
            lambda.addPermission(params, function (err, data) {
                if (err) reject({ error: true, err }); // an error occurred
                else resolve({ error: false, data }); // successful response
            });
        });
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
