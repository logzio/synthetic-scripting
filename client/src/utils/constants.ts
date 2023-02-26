export const DEFAULT_CODE = `const playwright = require('playwright-aws-lambda');
	const readSendData = require('./rsData');
	
	const handler = async () => {
		let context = null;
		let browser = null;
		try {
		browser = await playwright.launchChromium(false);
		context = await browser.newContext({
			recordHar: {
				path: './capture-hars/page.har',
				mode: 'full',
				content: 'omit',
			},
		});
		const page = await context.newPage();
		//////////////////////////////////
		//// add your code from here ////
		///////////////////////////////////
						
		///////////////////////////////////
		//// add your code to here ////
		//////////////////////////////////
					
		} catch (error) {
			throw error;
		} finally {
			if (browser) {
				await context.close();
				await browser.close();
			}
		}
		
		readSendData();
		return true;
	};`
