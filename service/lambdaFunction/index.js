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
			
	

	await page.goto('https://app.logz.io/#/login');
await page.type('[name="email"]', 'test@testlogz.io');
await page.type('[name="password"]', 'qwertyuio');
await page.click('button[type="submit"]');
await page.waitForTimeout(10000);				
	


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