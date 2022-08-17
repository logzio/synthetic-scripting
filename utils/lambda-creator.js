const AWS = require('aws-sdk');

const { NAME_OF_ZIP_FILE, LAMBDA_FUNCTION_NAME } = require('./constants');

// Set the parameters.

exports.createLambda = async (
    functionName,
    description,
    token,
    bucketName,
    accessKey,
    secretKey,
    iamRoleArn,
    region,
) => {
    const params = {
        Code: {
            S3Bucket: bucketName, // BUCKET_NAME
            S3Key: NAME_OF_ZIP_FILE, // ZIP_FILE_NAME
        },
        FunctionName: functionName || LAMBDA_FUNCTION_NAME,
        Handler: 'index.handler',
        // Role: process.env.IAM_ROLE_ARN, // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
        Role: iamRoleArn, // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
        Runtime: 'nodejs16.x',
        Description: description,
        MemorySize: 512,
        Timeout: 80,
        Environment: {
            Variables: {
                // TOKEN: process.env.TOKEN,
                TOKEN: token,
            },
        },
    };
    try {
        // const lambda = new LambdaClient({ region: process.env.REGION });
        AWS.config.update({
            // accessKeyId: process.env.ACCESS_KEY,
            // secretAccessKey: process.env.SECRET_KEY,
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
        });
        const lambda = new AWS.Lambda({
            // region: process.env.REGION,
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
        console.log('Error', err); // an error occurred
        return {
            error: true,
            err,
        };
    }
};
