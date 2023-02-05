module.exports = {
    startFile: `const playwright = require('playwright-aws-lambda');
	const path = require('path');
	const readSendData = require('./rsData');


	exports.handler = async (event) => {
		let context = null;
		let err = null;
		let page = null;
		try {
			
			browser = await playwright.launchChromium(false);
			context = await browser.newContext({
				recordHar: {
					path: path.join(__dirname, '..', '..', 'tmp', 'example.har'),
					mode: 'full',
					content: 'omit',
				},
			});
			await context.tracing.start({ screenshots: false, snapshots: false });

			page = await context.newPage();
			
	`,
    endFile: `

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
};`,
    startFileLocally: `const playwright = require('playwright-aws-lambda');
	const { chromium } = require('playwright-core');

	const errorStatusHandler = require('./statusError');
	
	const handlerLocally = async () => {
		let context = null;
		let err = null;
		let page = null;
		let browser = null;
		try {	
			browser = await chromium.launch({});
			context = await browser.newContext();
			page = await context.newPage();
	`,
    endFileLocally: `       } catch (error) {
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
handlerLocally()
// module.exports = handlerLocally;
`,
};
