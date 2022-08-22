const playwright = require('playwright-aws-lambda');

const readSendData = require('./rsData');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.handler = async (event, context) => {
    let context = null;
    let browser = null;
    try {
        browser = await playwright.launchChromium(false);
        context = await browser.newContext({
            recordHar: {
                path: './capture-hars/example.har',
                mode: 'full',
                content: 'omit',
            },
        });
        const page = await context.newPage();

        readSendData();
    } catch (error) {
        throw error;
    } finally {
        if (browser) {
            await context.close();
            await browser.close();
        }
    }
    logger.sendAndClose();
    await sleep(4000);
    return true;
};
