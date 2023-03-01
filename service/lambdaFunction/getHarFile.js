const playwright = require('playwright-aws-lambda');
const { harFromMessages } = require('chrome-har');

module.exports = {
    getHarFile: async function (pageUrl) {
        let browser;
        const events = [];

        try {
            // list of events for converting to HAR

            // event types to observe
            const observe = [
                'Page.loadEventFired',
                'Page.domContentEventFired',
                'Page.frameStartedLoading',
                'Page.frameAttached',
                'Network.requestWillBeSent',
                'Network.requestServedFromCache',
                'Network.dataReceived',
                'Network.responseReceived',
                'Network.resourceChangedPriority',
                'Network.loadingFinished',
                'Network.loadingFailed',
            ];
            // Create a URL object for use later
            // const url = new URL(pageUrl);
            browser = await playwright.launchChromium({ headless: true });
            const pageHar = await browser.newPage();

            // register events listeners
            const client = await pageHar.context().newCDPSession(pageHar);
            await client.send('Page.enable');
            await client.send('Network.enable');
            observe.forEach((method) => {
                client.on(method, (params) => {
                    events.push({ method, params });
                });
            });
            await pageHar.goto(pageUrl);
        } catch (err) {
            console.log(err);
        } finally {
            await browser.close();
            return harFromMessages(events);
        }
    },
};
