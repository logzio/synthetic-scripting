module.exports = {
    startFile: `const playwright = require('playwright-aws-lambda');

	const readSendData = require('./rsData');

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	exports.handler = async (event, context) => {
		let context = null;
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
			
	`,
    endFile: `
	readSendData();

} catch (error) {
		throw error;
	} finally {
		if (browser) {
			await context.close();
			await browser.close();
		}
	}
    logger.sendAndClose();
    await sleep(4000);
    return true;
};`,
    startFileLocally: `const playwright = require('playwright-aws-lambda');

	const readSendData = require('./rsData');
	
	const handler = async () => {
		let context = null;
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
	`,
    endFileLocally: `    } catch (error) {
        throw error;
    } finally {
        if (browser) {
            await context.close();
            await browser.close();
        }
    }

    readSendData(process.argv[2]);
    return true;
};
handler();`,
};
