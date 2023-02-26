const playwright = require('playwright-aws-lambda');
const path = require('path');
const readSendData = require('./rsData');
const cfnResponse = require('cfn-response-async');
const pageHandler = require('./handlerHar');

const firstRun = async (event, context) => {
    await regularRun();

    return await cfnResponse.send(
        event,
        context,
        'SUCCESS',
        {},
        'first-invoke-id',
    );
};

const regularRun = async () => {
    let context = null;
    let err = null;
    let page = null;
    let browser;
    try {
        browser = await playwright.launchChromium(false);
        context = await browser.newContext({
            recordHar: {
                path: path.join(__dirname, '..', '..', 'tmp', 'page.har'),
                mode: 'full',
                content: 'omit',
            },
        });
        await context.tracing.start({ screenshots: false, snapshots: false });

        page = await context.newPage();
    } catch (error) {
        console.log(error);
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

exports.handler = async (event, context) => {
    if (event.RequestType === 'Create' || event.RequestType === 'Delete') {
        return await firstRun(event, context);
    } else {
        return await regularRun();
    }
};
