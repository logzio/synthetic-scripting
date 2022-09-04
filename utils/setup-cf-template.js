const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');
const dirOutput = path.join(__dirname, '..', 'output');
/**
 * Function to create new Cloud Formation  template for customer
 *
 * @param  {string} listEnvVariables - Code snippet from ace editor inside Playwright test code
 */
exports.setupCFTemplate = async (listEnvVariables) => {
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
        let updatedSam = doc;
        if (listEnvVariables.length > 0) {
            updatedSam = updateTemplate(listEnvVariables, doc);
        }
        const result = await new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'output', 'sam-template.yml'),
                updatedSam,
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
 * @param  {object} envList - Object with envariment keys and envariment values
 * @param  {string} template -  YML file content with pre defined values
 */
const updateTemplate = (envList, template) => {
    const samTemplate = template.split('##Add Input Env Variables');

    envList.forEach((env) => {
        const key = Object.keys(env);

        const inputField = `  LambdaEnvVariable${key[0]}:
    Type: "String"
    Description: "Auto generated envariment variable ${key[0]}";
   `;
        samTemplate.splice(1, 0, inputField);

        const lineOfEnvVariable = `          ${key[0]}: !Ref LambdaEnvVariable${key[0]}`;
        samTemplate.push(lineOfEnvVariable);
    });
    return samTemplate.join('\n');
};
