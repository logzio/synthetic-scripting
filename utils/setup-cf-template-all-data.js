const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');
const dirOutput = path.join(__dirname, '..', 'output');
/**
 * Function to create new Cloud Formation  template for customer
 *
 * @param  {string} listEnvVariables - Code snippet from ace editor inside Playwright test code
 * @param  {string} name - Code snippet from ace editor inside Playwright test code
 * @param  {string} description - Code snippet from ace editor inside Playwright test code
 * @param  {string} token - Code snippet from ace editor inside Playwright test code
 * @param  {string} listener - Code snippet from ace editor inside Playwright test code
 * @param  {string} rangeTime - Code snippet from ace editor inside Playwright test code

 */

exports.setupCFTemplate = async (
    listEnvVariables,
    name,
    description,
    token,
    bucket,
    listener,
    rangeTime,
) => {
    try {
        const doc = fs.readFileSync(
            path.join(
                __dirname,
                '..',
                'service',
                'cloudFormation',
                'sam-template.yml',
            ),
            'utf8',
        );

        if (!fs.existsSync(dirOutput)) {
            fs.mkdirSync(dirOutput);
        }
        const updatedSam = updateTemplateRequiredData(
            name,
            description,
            token,
            bucket,
            listener,
            rangeTime,
            doc,
        );
        let updatedSamEnvVar = updatedSam;

        if (listEnvVariables.length > 0) {
            updatedSamEnvVar = updateTemplate(listEnvVariables, updatedSam);
        }
        const result = await new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'output', 'sam-template.yml'),
                updatedSamEnvVar,
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
 * @param  {object} envList - Object with Environment keys and Environment values
 * @param  {string} template -  YML file content with pre defined values
 */

const updateTemplateRequiredData = (
    name,
    description,
    token,
    bucket,
    listener,
    rangeTime,
    template,
) => {
    // #add Bucket name
    let samTemplate = template.split('#add Bucket name');
    const bucketString = `        Bucket: ${bucket}`;
    samTemplate.splice(1, 0, bucketString);
    samTemplate = samTemplate.join('\n');

    // #add zipNameRoute
    samTemplate = samTemplate.split('#add zipNameRoute');
    const zipNameString = `        Key: ${name.replace(
        /[^a-zA-Z0-9 ]/g,
        '',
    )}.zip`;
    samTemplate.splice(1, 0, zipNameString);
    samTemplate = samTemplate.join('\n');
    // #add name of the text
    samTemplate = samTemplate.split('#add name of the text');
    const functionName = `      FunctionName: ${name}`;
    samTemplate.splice(1, 0, functionName);
    samTemplate = samTemplate.join('\n');

    // #add timeout
    samTemplate = samTemplate.split('#add name of the text');
    const timeOut = `            Schedule: rate(${rangeTime} minute${
        parseInt(rangeTime, 10) === 1 ? '' : 's'
    })`;
    samTemplate.splice(1, 0, timeOut);
    //  token
    const tokenLogz = `          TOKEN: ${token}`;
    samTemplate.push(tokenLogz);

    //listener
    const listenerLogz = `          LISTENER_URL: ${listener}`;
    samTemplate.push(listenerLogz);

    //name
    const functionNameEnvVariable = `          NAME_FUNCTION: ${name}`;
    samTemplate.push(functionNameEnvVariable);

    return samTemplate;
};

const updateTemplate = (envList, template) => {
    const samTemplate = template.split('##Add Input Env Variables');

    envList.forEach((env) => {
        const key = Object.keys(env);

        const lineOfEnvVariable = `          ${key[0]}: ${env[key[0]]}`;
        samTemplate.push(lineOfEnvVariable);
    });
    return samTemplate.join('\n');
};
