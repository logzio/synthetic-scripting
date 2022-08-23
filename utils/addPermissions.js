const AWS = require('aws-sdk');
const { CLOUDWATCH_EVENT } = require('./constants');

exports.addPermissions = async (
    name,
    accessKey,
    secretKey,
    region,
    accountId,
) => {
    try {
        AWS.config.update({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
        });
        const lambda = new AWS.Lambda({
            region: region,
        });
        return new Promise((resolve, reject) => {
            var params = {
                Action: 'lambda:InvokeFunction' /* required */,
                FunctionName: name || LAMBDA_FUNCTION_NAME /* required */,
                Principal: 'events.amazonaws.com' /* required */,
                StatementId: 'my-scheduled-event' /* required */,
                SourceArn: `arn:aws:events:${region}:${accountId}:rule/${CLOUDWATCH_EVENT}`,
            };
            lambda.addPermission(params, function (err, data) {
                if (err) reject({ error: true, err }); // an error occurred
                else resolve({ error: false, data }); // successful response
            });
        });
    } catch (err) {
        return {
            error: true,
            err,
        };
    }
};
