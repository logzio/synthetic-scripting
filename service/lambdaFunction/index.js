const playwright = require('playwright-aws-lambda');

const readSendData = require('./rsData');
// const playwright = require('playwright-aws-lambda');
// const { PlaywrightHar } = require('playwright-har');
// const logger = require('logzio-nodejs').createLogger({
//     token: process.env.TOKEN,
//     protocol: 'https',
//     host: 'listener.logz.io',
//     port: '8071',
//     type: 'syntetic-scripting', // OPTIONAL (If none is set, it will be 'nodejs')
//     sendIntervalMs: 1000,
// });
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.handler = async (event, context) => {
    let browser = null;
    let context;
    try {
        browser = await playwright.launchChromium();
        context = await browser.newContext({
            recordHar: {
                path: './capture-hars/example.har',
                mode: 'full',
                content: 'omit',
            },
        });

        const page = await context.newPage();
        readSendData(token);
    } catch (error) {
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    logger.sendAndClose();
    await sleep(4000);
    return true;
};
