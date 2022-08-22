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
	

        page.goto('https://app.logz.io/#/login').then(() => {
            return;
        });

        await page.type('[name="email"]', 'test@testlogz.io');
        await page.type('[name="password"]', 'qwertyuio');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(10000);

        await page.waitForSelector('.overlay > .logzio-icon-close-round ');
        await page.click('.overlay > .logzio-icon-close-round');
        const messageLog = await page.innerText('truncate-by-height');

        if (!messageLog) {
            throw new Error('first log didn`t upload');
        }

        const execudedScript = await page.addInitScript({
            script: 'return 1+1',
        });

        if (execudedScript != 2) {
            throw new Error('script not launched');
        }

        await page.waitForTimeout(10000);

        
    } catch (error) {
		console.log('is here?', error);
		err= error.message;
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