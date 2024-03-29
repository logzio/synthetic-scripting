const AWS = require('aws-sdk');

const {
    LAMBDA_FUNCTION_NAME,
    BASIC_EXECUTION_ROLE_NAME,
} = require('./constants');
const { AIMRole } = require('./AIM-role');
const { getAccountId } = require('./get-account-id');
const { logger } = require('./logger');

/**
 * Function Create and Assign proper roles to Lambda Function
 * @param  {string} functionName - Name of Lambda Function
 * @param  {string} testDevice - Name Device where need to run a test
 * @param  {string} description - Description of Lambda Function
 * @param  {string} token - Shipping token from logzio
 * @param  {string} bucketName - AWS Bucket name
 * @param  {string} accessKey -  AWS Access Key
 * @param  {string} secretKey - AWS secret Key
 * @param  {string} region -  AWS region where need to create synthetic logic
 * @param  {object} listEnvVariables - list of Environment variable for Lambda Function
 * @param  {string} listenerUrl  - Logzio listener url to send metrics/logs
 * @param  {boolean} onChangeRecordStatus - Flag for record a browser based video of test
 */

exports.createLambda = async (
    functionName,
    testDevice,
    description,
    token,
    bucketName,
    accessKey,
    secretKey,
    region,
    listEnvVariables,
    listenerUrl,
    onChangeRecordStatus,
) => {
    const accountId = await getAccountId(accessKey, secretKey);

    const policyArn = `arn:aws:iam::${accountId}:policy/service-role/AWSLambdaBasicExecutionRole`;

    const pathToRole = 'lambdaRole.json';
    let variables = {};
    listEnvVariables.forEach((envVariable) => {
        variables = { ...variables, ...envVariable };
    });

    const nameZip =
        functionName.split(' ').length > 0
            ? functionName.split(' ').join('-')
            : functionName;

    try {
        const iamRole = await AIMRole(
            accessKey,
            secretKey,
            BASIC_EXECUTION_ROLE_NAME,
            pathToRole,
            policyArn,
            accountId,
        );

        if (iamRole.err) {
            throw iamRole.err;
        }
        const params = {
            Code: {
                S3Bucket: bucketName, // BUCKET_NAME
                S3Key: `${nameZip}.zip`, // ZIP_FILE_NAME
            },
            FunctionName: functionName || LAMBDA_FUNCTION_NAME,
            Handler: 'index.handler',
            Role: iamRole.arn, // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
            Runtime: 'nodejs16.x',
            Description: description,
            MemorySize: 512,
            Timeout: 300,
            Environment: {
                Variables: {
                    ...variables,
                    TOKEN: token,
                    LISTENER_URL: listenerUrl,
                    REGION: region,
                    TEST_DEVICE: testDevice,
                    NAME_FUNCTION: functionName,
                    BUCKET_NAME: bucketName,
                    IS_RECORD: onChangeRecordStatus
                        ? 'to_record'
                        : 'not_to_record',
                },
            },
        };

        AWS.config.update({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
        });
        const lambda = new AWS.Lambda({
            region,
        });

        return new Promise((resolve, reject) => {
            lambda.createFunction(params, function (err, data) {
                if (err)
                    reject({
                        error: true,
                        err,
                    });
                // an error occurred
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
