const playwright = require('playwright-aws-lambda');
	const errorStatusHandler = require('./statusError');
	
	const handlerLocally = async () => {
		let context = null;
		let err = null;
		let page = null;
		try {
			browser = await playwright.launchChromium(false);
			context = await browser.newContext();
			page = await context.newPage();
	

			  const navigationPromise = page.waitForNavigation();
    await page.goto('https://logz.io/');
page.setDefaultTimeout(4000);


    await page.waitForSelector('.home > .body_wrapper > .cta_bottom_section');
    await page.click('.home > .body_wrapper > .cta_bottom_section');

    await page.waitForSelector(
        '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(2) > .navigation-link',
    );
    await page.click(
        '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(2) > .navigation-link',
    );

    await navigationPromise;




    await navigationPromise;		
	    await page.waitForSelector('.home > .body_wrapper > .cta_bottom_section',{
			timeout:4000,
		}).then((res)=>{
			console.log(res);
		}).catch(err=> {throw Error('element not render')});
	
		
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
