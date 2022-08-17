const {
    PutRuleCommand,
    PutTargetsCommand,
} = require('@aws-sdk/client-eventbridge');

const { addPermissions } = require('./addPermissions');
const { CLOUDWATCH_EVENT } = require('./constants');

const { EventBridgeClient } = require('@aws-sdk/client-eventbridge');

exports.cloudWatchEvent = async (
    name,
    range_time,
    region,
    accessKey,
    secretKey,
    iamRoleArnEvent,
) => {
    const cweClient = new EventBridgeClient({
        region,
        credentials: {
            // accessKeyId: process.env.ACCESS_KEY,
            // secretAccessKey: process.env.SECRET_KEY,
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
        },
    });
    const paramsTarget = {
        Rule: CLOUDWATCH_EVENT,
        Targets: [
            {
                Arn: `arn:aws:lambda:${process.env.REGION}:${process.env.ACCOUNT_ID}:function:${name}`, //LAMBDA_FUNCTION_ARN
                Id: 'myCloudWatchEventsTarget',
            },
        ],
    };
    const paramsRule = {
        Name: CLOUDWATCH_EVENT,
        // RoleArn: process.env.IAM_ROLE_ARN_EVENT, //IAM_ROLE_ARN
        RoleArn: iamRoleArnEvent,
        ScheduleExpression: `rate(${range_time} minute${
            parseInt(range_time) === 1 ? '' : 's'
        })`,
        State: 'ENABLED',
    };

    try {
        const dataRule = await cweClient.send(new PutRuleCommand(paramsRule));

        const dataPermissions = await addPermissions(name);
        if (dataPermissions.error) {
            throw Error(dataPermissions.err);
        }

        const data = await cweClient.send(new PutTargetsCommand(paramsTarget));

        return { data, dataRule, dataPermissions };
    } catch (err) {
        return err;
    }
};
