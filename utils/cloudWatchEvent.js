const {
    PutRuleCommand,
    PutTargetsCommand,
    EventBridgeClient,
} = require('@aws-sdk/client-eventbridge');

const { addPermissions } = require('./addPermissions');
const { PUT_RULE_ROLE_NAME } = require('./constants');
const { getAccountId } = require('./get-account-id');
const { AIMRole } = require('./AIM-role');
const { logger } = require('./logger');

/**
 * @param  {string} name - name of the lambda function and test in a logs
 * @param  {string} rangeTime - set interval for run Lambda function( in minutes)
 * @param  {string} region - AWS region where you want to run all synthetic logic
 * @param  {string} accessKey - AWS Access Key
 * @param  {string} secretKey - AWS Secret Key
 */

exports.cloudWatchEvent = async (
    name,
    rangeTime,
    region,
    accessKey,
    secretKey,
) => {
    try {
        const policyArn =
            'arn:aws:iam::aws:policy/service-role/CloudWatchEventsBuiltInTargetExecutionAccess';
        const pathToRole = 'putRole.json';
        const cweClient = new EventBridgeClient({
            region: region,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            },
        });

        const accountId = await getAccountId(accessKey, secretKey);

        if (accountId.error) {
            throw Error("Can't get Account Id");
        }

        const paramsTarget = {
            Rule: `${rangeTime}-${PUT_RULE_ROLE_NAME}`,
            Targets: [
                {
                    Arn: `arn:aws:lambda:${region}:${accountId}:function:${name}`,
                    Id: 'myCloudWatchEventsTarget',
                },
            ],
        };

        const iamRole = await AIMRole(
            accessKey,
            secretKey,
            PUT_RULE_ROLE_NAME,
            pathToRole,
            policyArn,
        );

        if (iamRole.err) {
            throw iamRole.err;
        }

        const paramsRule = {
            Name: `${rangeTime}-${PUT_RULE_ROLE_NAME}`,
            RoleArn: iamRole.arn,
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
            rangeTime,
            accountId,
        );
        if (dataPermissions.error) {
            throw Error(dataPermissions.err);
        }

        const data = await cweClient.send(new PutTargetsCommand(paramsTarget));

        return { data, dataRule, dataPermissions };
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
