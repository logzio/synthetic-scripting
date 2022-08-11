module.exports = {
    startFile: `require('dotenv').config();
	const fs = require('fs');
	const path = require('path');
	const  convertHarToJSON  = require('./convertHarToJSON');

	const playwright = require('playwright-aws-lambda');
	const { PlaywrightHar } = require('playwright-har');
	const parseHarFile = require('./parseHar');
	const loggerGenerator = require('./logger');

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	exports.handler = async (event, context) => {
		let browser = null;
		let harData = null;
		const logger =loggerGenerator(token);
		try {
			browser = await playwright.launchChromium();
			const context = await browser.newContext();
	
			const page = await context.newPage();
			const playwrightHar = new PlaywrightHar(page);
			await playwrightHar.start();
	`,
    endFile: `      harData = await playwrightHar.stop();
} catch (error) {
	throw error;
} finally {
	if (browser) {
		await browser.close();
	}
}
try {
    const parsedData = convertHarToJSON(harData);
   
    parsedData.result.forEach((log) => {
        logger.log(log);
    });

} catch (err) {
	console.log(err);
}
logger.sendAndClose();
await sleep(4000);

return true;
};
`,
    startFileLocally: `require('dotenv').config();
const fs = require('fs');
const path = require('path');
const convertHarToJSON = require('./convertHarToJSON');
const playwright = require('playwright-aws-lambda');
const { PlaywrightHar } = require('playwright-har');


const handler = async (event, context) => {
	let browser = null;
	let harData = null;
	try {
		browser = await playwright.launchChromium();
		const context = await browser.newContext();

		const page = await context.newPage();
		const playwrightHar = new PlaywrightHar(page);
		await playwrightHar.start();
`,
    endFileLocally: `      harData = await playwrightHar.stop();
} catch (error) {
throw error;
} finally {
if (browser) {
	await browser.close();
}
}
try {
    const parsedData = convertHarToJSON(harData);
   
    parsedData.result.forEach((log) => {
        logger.log(log);
    });

} catch (err) {
	console.log(err);
}
logger.sendAndClose();
await sleep(4000);
return true;
};
handler();
`,
};
