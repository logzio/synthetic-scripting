const playwright = require('playwright-aws-lambda');
const { webkit, devices } = require('playwright');

const errorStatusHandler = require('./statusError');

const handlerLocally = async () => {
    const mobileDevice = devices['Galaxy Note 3'];

    let context = null;
    let err = null;
    let page = null;
    let browser = null;
    try {
        browser = await webkit.launch({ headless: true });
        context = await browser.newContext({
            ...mobileDevice,
        });
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
