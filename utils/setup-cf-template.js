const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');
const dirOutput = '../output';
/**
 * Function to create new Cloud Formation  template for customer
 * TODO: need to populate  env variables
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

        fs.writeFile('../output/sam-template.yml', doc, (err) => {
            if (err) throw err;
        });
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
