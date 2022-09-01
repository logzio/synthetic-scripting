const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');

const isRoleExists = async (iam, roleName) => {
    const paramsGetRole = {
        RoleName: roleName,
    };
    const result = new Promise((resolve, reject) => {
        iam.getRole(paramsGetRole, function (err, data) {
            if (err) reject({ error: true, err }); // an error occurred
            else resolve(data); // successful response
        });
    });

    return result;
};

const createRole = async (iam, roleName, pathToRole) => {
    const policy = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '..', 'helper', 'roles', pathToRole),
            'utf8',
        ),
    );
    const params = {
        AssumeRolePolicyDocument: JSON.stringify(policy),
        Path: '/',
        RoleName: roleName,
    };

    return new Promise((resolve, reject) => {
        iam.createRole(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err); // an error occurred
            } else resolve(data); // successful response
        });
    });
};

const setPolicy = async (iam, roleName, policyArn) => {
    const paramsPolicy = {
        PolicyArn: policyArn,
        RoleName: roleName,
    };
    return new Promise((resolve, reject) => {
        iam.attachRolePolicy(paramsPolicy, function (err, data) {
            if (err) reject(err); // an error occurred
            else resolve(data); // successful response
        });
    });
};
/**
 * @param  {string} accessKey - AWS Access Key
 * @param  {string} secretKey - AWS Secret Key
 * @param  {string} roleName - AWS Role what need to attach
 * @param  {string} pathToRole - Path to json file
 * @param  {string} policyArn - AWS Arn policy
 */
exports.AIMRole = async (
    accessKey,
    secretKey,
    roleName,
    pathToRole,
    policyArn,
) => {
    AWS.config.update({
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    });
    const iam = new AWS.IAM();
    try {
        const getIfRoleExists = await isRoleExists(iam, roleName);
        if (getIfRoleExists.Role) {
            return { arn: getIfRoleExists.Role.Arn };
        }
    } catch (err) {
        logger("Role Doesn't exist process to create");
    }

    try {
        const role = await createRole(iam, roleName, pathToRole);

        if (role.err) {
            throw err;
        }

        const setPolicyStatus = await setPolicy(iam, roleName, policyArn);

        if (setPolicyStatus.err) {
            throw err;
        }

        return { arn: role.Role.Arn };
    } catch (err) {
        logger(err);
        return err;
    }
};
