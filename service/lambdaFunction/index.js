const playwright = require('playwright-aws-lambda');
	const path = require('path');
	const readSendData = require('./rsData');

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
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
			page = await context.newPage();
			
	

					
	


} catch (error) {
	err = error.message;
	} finally {
		if (browser) {
			await context.close();
			await browser.close();
		}
	}
	readSendData(err);
    await sleep(4000);
    return true;
};