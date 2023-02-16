const playwright = require('playwright-aws-lambda');
const { webkit, devices } = require('playwright');
const path = require('path');
const readSendData = require('./rsData');

exports.handler = async (event) => {
    const mobileDevice = devices['Galaxy Note 3'];
    let context = null;
    let err = null;
    let page = null;
    let browser = null;

    try {
        browser = await playwright.launchChromium(false);
        context = await browser.newContext({
            recordHar: {
                path: path.join(__dirname, '..', '..', 'tmp', 'example.har'),
                mode: 'full',
                content: 'omit',
            },
            ...mobileDevice,
        });
        await context.tracing.start({ screenshots: false, snapshots: false });

        page = await context.newPage();
    } catch (error) {
        err = error.message;
    } finally {
        if (browser) {
            await context.tracing.stop({
                path: path.join(__dirname, '..', '..', 'tmp', 'trace.zip'),
            });
            await context.close();
            await browser.close();
        }
    }
    await readSendData(err);
    return true;
};
