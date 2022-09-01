require('dotenv').config();
const playwright = require('playwright-aws-lambda');
const { PlaywrightHar } = require('playwright-har');
const logger = require('logzio-nodejs').createLogger({
    token: process.env.TOKEN,
    protocol: 'https',
    host: process.env.LISTENER_URL,
    port: '8071',
    type: 'syntetic-scripting', // OPTIONAL (If none is set, it will be 'nodejs')
    sendIntervalMs: 1000,
});
const { convertHarToJSON } = require('./convertHarToJSON');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.handler = async () => {
    let browser = null;
    let harData = null;
    try {
        browser = await playwright.launchChromium();
        const context = await browser.newContext();

        const page = await context.newPage();
        const playwrightHar = new PlaywrightHar(page);
        await playwrightHar.start();

        harData = await playwrightHar.stop();
    } catch (error) {
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
    try {
        const parsedData = convertHarToJSON(harData);
        parsedData.forEach((log) => {
            logger.log(log);
        });
    } catch (err) {
        console.log(err);
    }
    logger.sendAndClose();
    await sleep(4000);

    return true;
};
