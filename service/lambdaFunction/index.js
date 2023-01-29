const playwright = require('playwright-aws-lambda');
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
			
	

	const navigationPromise = page.waitForNavigation()

await page.goto('https://logz.io/')


await page.waitForSelector('#slick-slide20 > .home_slider_item__bottom > .home_slider_item__bottom_row > .home_slider_item__button > .theme_btn')
await page.click('#slick-slide20 > .home_slider_item__bottom > .home_slider_item__bottom_row > .home_slider_item__button > .theme_btn')

await navigationPromise

await page.waitForSelector('.d-flex:nth-child(1) > .content_box > .more_info_btns > .read_more > .text-link')
await page.click('.d-flex:nth-child(1) > .content_box > .more_info_btns > .read_more > .text-link')

await navigationPromise					
		


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