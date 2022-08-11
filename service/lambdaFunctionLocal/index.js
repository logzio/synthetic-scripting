require('dotenv').config();
const fs = require('fs');
const path = require('path');
const convertHarToJSON = require('./convertHarToJSON');
const playwright = require('playwright-aws-lambda');
const { PlaywrightHar } = require('playwright-har');
const loggerGenerator = require('./logger');

const handler = async (token)=>{
    let context = null;
    let harData = null;
	const logger =loggerGenerator(token);
    try {
        browser = await playwright.launchChromium();
        // content?: "omit"|"embed"|"attach";
        context = await browser.newContext({
            recordHar: {
                path: './example.har',
                mode: 'full',
                content: 'omit',
            },
        });

		const urls = [];
        const page = await context.newPage();
		let playwrightHar;
		page.on('load', async(data)=>{
			if(!urls.includes(data.url()))
			{
				
				urls.push(data.url()) 
			console.log('here');
			// const d = data.context();
			 playwrightHar = new PlaywrightHar(page);
			await playwrightHar.start();
			
			// // console.log(data);
			// console.log(JSON.stringify(d));
			// 	writeFileSync('text.txt',d );
			// console.log(data);
		
			}
			
		})
        const navPromise = page.waitForNavigation();

        await page.goto('https://logz.io/');

		
        await page.setViewportSize({ width: 1850, height: 877 });

        await page.waitForSelector(
            '.home > .body_wrapper > .cta_bottom_section',
        );
        await page.click('.home > .body_wrapper > .cta_bottom_section');

        await page.waitForSelector(
            '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(2) > .navigation-link',
        );
		await navPromise;

		await page.click(
            '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(2) > .navigation-link',
        );
        await page.waitForSelector(
			'.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(3) > .navigation-link',
			);
		await navPromise;
        // await page.goto('https://logz.io/about-us');

    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (browser) {
            await context.close();
            await browser.close();
        }
		return true
    }
    const parsedData = convertHarToJSON(harData);
   
    parsedData.result.forEach((log) => {
        logger.log(log);
    });

    return true;
};
handler();
