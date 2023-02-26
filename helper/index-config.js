module.exports = {
    startFile: `const playwright = require('playwright-aws-lambda');
	const path = require('path');
	const readSendData = require('./rsData');
	const cfnResponse = require('cfn-response-async');
	const pageHandler = require('./handlerHar');
	const pathToFfmpeg = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(pathToFfmpeg);
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
			browser = await playwright.launchChromium();
			const size = { width: 1280, height: 600 };

			context = await browser.newContext({
				recordHar: {
					path: path.join(__dirname, '..', '..', 'tmp', 'example.har'),
					mode: 'full',
					content: 'omit',
				},
			});
			await context.tracing.start({ screenshots: false, snapshots: false });
	
			page = await context.newPage();
			let count = 0;
			page.on('load', async (data) => {
				count++;
				await pageHandler(data, count);
			});
	`,
    endFile: `


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
};`,
    startFileLocallyDeviceSelection: `const playwright = require('playwright-aws-lambda');
const { webkit, devices } = require('playwright');

const errorStatusHandler = require('./statusError');

const handlerLocally = async () => {
	const mobileDevice = devices['NAME_OF_DEVICE'];

	let context = null;
	let err = null;
	let page = null;
	let browser = null;
	try {	
		browser = await webkit.launch({headless:true});
		context = await browser.newContext({
			...mobileDevice
		});
		page = await context.newPage();
`,
    startFileLocally: `const playwright = require('playwright-aws-lambda');
	const { chromium } = require('playwright-core');
	const path = require('path');

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
