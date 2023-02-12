const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');
const dirOutput = path.join(__dirname, '..', 'output');

/**
 * Function to create new Cloud Formation  template for customer
 *
 * @param  {string} listEnvVariables - Code snippet from ace editor inside Playwright test code
 * @param  {string} name - Name of Lambda Function
 * @param  {string} description - Description of Lambda Function
 * @param  {string} token - Shipping token from logzio
 * @param  {string} bucket - Bucket name
 * @param  {string} listener - Logzio listener url to send metrics/logs
 * @param  {string} region - AWS Region name
 * @param  {string} rangeTime - set interval for run Lambda function( in minutes)
 */
exports.setupCFTemplate = async (
    listEnvVariables,
    name,
    description,
    token,
    bucket,
    listener,
    region,
    rangeTime,
) => {
    try {
        const doc = yaml.load(
            fs.readFileSync(
                path.join(
                    __dirname,
                    '..',
                    'service',
                    'cloudFormation',
                    'sam-template-empty.yml',
                ),
                'utf8',
            ),
        );
        fs.rmSync(dirOutput, { recursive: true, force: true });
        if (!fs.existsSync(dirOutput)) {
            fs.mkdirSync(dirOutput);
        }
        let updatedSam = updateTemplate(
            doc,
            name,
            description,
            token,
            bucket,
            listener,
            region,
            rangeTime,
        );

        if (listEnvVariables.length > 0) {
            updatedSam = addEnvVariableToTemplate(listEnvVariables, updatedSam);
        }
        const updateParams = await new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'output', 'sam-template.yml'),
                yaml.dump(updatedSam),
                (err) => {
                    if (err) reject(err);
                    resolve({ error: false, message: 'Sam Template Created' });
                },
            );
        });
        if (updateParams.err) {
            throw updateParams.err;
        }
        const result = await new Promise((resolve, reject) => {
            const ymlData = fs.readFileSync(
                path.join(__dirname, '..', 'output', 'sam-template.yml'),
                'utf8',
            );
            const ymlArray = ymlData.split('\n');
            const idxRole = ymlArray.indexOf('      Role: dump');
            ymlArray[idxRole] =
                '      Role: !GetAtt syntheticQueryS3Bucket.Arn';

            const idxRoleName = ymlArray.indexOf('      RoleName: dump');
            ymlArray[idxRoleName] =
                "      RoleName: !Join [ '-', [ 'LogzioSyntheticMonitoringLambdaRole', !Select [ 4, !Split [ '-', !Select [ 2, !Split [ '/', !Ref AWS::StackId ] ] ] ] ] ]";

            const idxPolicyName = ymlArray.indexOf(
                '        - PolicyName: dump',
            );
            ymlArray[idxPolicyName] =
                "        - PolicyName:  !Join [ '-', [ 'LogzioSyntheticMonitoringLambdaPolicy', !Select [ 4, !Split [ '-', !Select [ 2, !Split [ '/', !Ref AWS::StackId ] ] ] ] ] ]";

            const idxEventName = ymlArray.indexOf(
                '            Name: RateSchedule',
            );
            ymlArray[idxEventName] =
                "            Name: !Join [ '_', [ !Ref AWS::StackName, 'rateschudule' ] ]";

            const updYaml = ymlArray.join('\n');
            fs.writeFile(
                path.join(__dirname, '..', 'output', 'sam-template.yml'),
                updYaml,
                (err) => {
                    if (err) reject(err);
                    resolve({ error: false, message: 'Sam Template Created' });
                },
            );
        });
        if (result.err) {
            throw result.err;
        }
        return result;
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};

/**
 * Update CloudFormation Template populate Env Variables to Template
 * @param  {string} template - Empty Yml template
 * @param  {string} name - Name of Lambda Function
 * @param  {string} description - Description of Lambda Function
 * @param  {string} token - Shipping token from logzio
 * @param  {string} bucket - Bucket name
 * @param  {string} listener - Logzio listener url to send metrics/logs
 * @param  {string} region - AWS Region name
 * @param  {string} rangeTime - set interval for run Lambda function( in minutes)
 */
const updateTemplate = (
    template,
    name,
    description,
    token,
    bucket,
    listener,
    region,
    rangeTime,
) => {
    const newYaml = { ...template };

    // Bucket
    newYaml.Resources.ScheduledLambda.Properties.CodeUri.Bucket = bucket;

    // Zip
    const zipNameString = `${name.replace(/[^a-zA-Z0-9 ]/g, '')}.zip`;
    newYaml.Resources.ScheduledLambda.Properties.CodeUri.Key = zipNameString;
    //Function name
    newYaml.Resources.ScheduledLambda.Properties.FunctionName = name;

    // Description
    newYaml.Resources.ScheduledLambda.Properties.Description = description;

    //timeout
    const timeOut = `rate(${rangeTime} minute${
        parseInt(rangeTime, 10) === 1 ? '' : 's'
    })`;
    newYaml.Resources.ScheduledLambda.Properties.Events.CronEvent.Properties.Schedule =
        timeOut;

    // listener
    newYaml.Resources.ScheduledLambda.Properties.Environment.Variables.LISTENER_URL =
        listener;

    // listener
    newYaml.Resources.ScheduledLambda.Properties.Environment.Variables.REGION =
        region;

    // token
    newYaml.Resources.ScheduledLambda.Properties.Environment.Variables.TOKEN =
        token;

    // name
    newYaml.Resources.ScheduledLambda.Properties.Environment.Variables.NAME_FUNCTION =
        name;

    return newYaml;
};

/**
 * Update CloudFormation Template populate Env Variables to Template
 * @param  {object} envList - Object with Environment keys and Environment values
 * @param  {string} template -  YML file content with pre defined values
 */
const addEnvVariableToTemplate = (envList, template) => {
    envList.forEach((env) => {
        const key = Object.keys(env);

        template.Resources.ScheduledLambda.Properties.Environment.Variables[
            key[0]
        ] = env[key[0]];
    });
    return template;
};
