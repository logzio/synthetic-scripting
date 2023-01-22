const playwright = require('playwright-aws-lambda');
const errorStatusHandler = require('./statusError');

const handlerLocally = async () => {
    let context = null;
    let err = null;
    let page = null;
    let browser = null;
    try {
        browser = await playwright.launchChromium(false);
        context = await browser.newContext();
        page = await context.newPage();
    } catch (error) {
        err = error.message;
    } finally {
        if (browser) {
            await context.close();
            await browser.close();
        }
    }
    let status = errorStatusHandler(err);
    return status;
};
handlerLocally();
// module.exports = handlerLocally;
