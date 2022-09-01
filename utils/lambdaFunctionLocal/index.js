const playwright = require('playwright-aws-lambda');

const readSendData = require('./rsData');

const handler = async () => {
    let context = null;
    let err = null;
    let page = null;
    try {
        browser = await playwright.launchChromium(false);
        context = await browser.newContext({
            recordHar: {
                path: './capture-hars/example.har',
                mode: 'full',
                content: 'omit',
            },
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
    readSendData(process.argv[2], err, process.argv[3]);
    return true;
};
handler();
