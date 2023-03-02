const playwright = require('playwright-aws-lambda');
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
	

		
await page.goto('https://logz.io/');


await page.waitForSelector('.site-footer__menu_inner_col-2 > .site-footer__menu_group:nth-child(1) > .site-footer__menu_group_list > .site-footer__menu_group_item:nth-child(2) > a')
await page.click('.site-footer__menu_inner_col-2 > .site-footer__menu_group:nth-child(1) > .site-footer__menu_group_list > .site-footer__menu_group_item:nth-child(2) > a')

await page.waitForURL('**/careers/');

await page.waitForSelector('.col-lg-12 > .colomn-footer:nth-child(4) > .footer_list > li:nth-child(2) > a')
await page.click('.col-lg-12 > .colomn-footer:nth-child(4) > .footer_list > li:nth-child(2) > a')

await page.waitForURL('**/blog/');				
		
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
handlerLocally()
// module.exports = handlerLocally;
