const {
    PutRuleCommand,
    PutTargetsCommand,
} = require('@aws-sdk/client-eventbridge');

const { addPermissions } = require('./addPermissions');
const { CLOUDWATCH_EVENT } = require('./constants');

const { EventBridgeClient } = require('@aws-sdk/client-eventbridge');

exports.cloudWatchEvent = async (
    name,
    rangeTime,
    region,
    accessKey,
    secretKey,
    iamRoleArnEvent,
    accountId,
) => {
    try {
        const cweClient = new EventBridgeClient({
            region: region,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            },
        });
        const paramsTarget = {
            Rule: CLOUDWATCH_EVENT,
            Targets: [
                {
                    Arn: `arn:aws:lambda:${region}:${accountId}:function:${name}`, //LAMBDA_FUNCTION_ARN
                    Id: 'myCloudWatchEventsTarget',
                },
            ],
        };
        const paramsRule = {
            Name: CLOUDWATCH_EVENT,
            RoleArn: iamRoleArnEvent,
            ScheduleExpression: `rate(${rangeTime} minute${
                parseInt(rangeTime) === 1 ? '' : 's'
            })`,
            State: 'ENABLED',
        };
        const dataRule = await cweClient.send(new PutRuleCommand(paramsRule));

        const dataPermissions = await addPermissions(
            name,
            accessKey,
            secretKey,
            region,
            accountId,
        );
        if (dataPermissions.error) {
            throw Error(dataPermissions.err);
        }

        const data = await cweClient.send(new PutTargetsCommand(paramsTarget));

        return { data, dataRule, dataPermissions };
    } catch (err) {
        console.log('Error cloudbridge', err);
        return {
            error: true,
            err,
        };
    }
};
