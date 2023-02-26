const playwright = require('playwright-aws-lambda');
const { harFromMessages } = require('chrome-har');

module.exports = {
    getHarFile: async function (pageUrl) {
        // list of events for converting to HAR
        const events = [];

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
        const url = new URL(pageUrl);

        const browser = await playwright.launchChromium(false);
        const page = await browser.newPage();

        // register events listeners
        const client = await page.context().newCDPSession(page);
        await client.send('Page.enable');
        await client.send('Network.enable');
        observe.forEach((method) => {
            client.on(method, (params) => {
                events.push({ method, params });
            });
        });

        await page.goto(url.href);
        await browser.close();

        // convert events to HAR file
        return harFromMessages(events);
    },
};
