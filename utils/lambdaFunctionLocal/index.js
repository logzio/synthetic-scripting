const playwright = require('playwright-aws-lambda');

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

        const navPromise = page.waitForNavigation();

        await page.goto('https://logz.io/');

        await page.setViewportSize({ width: 1850, height: 877 });

        await page.waitForSelector(
            '.home > .body_wrapper > .cta_bottom_section',
        );
        await page.click('.home > .body_wrapper > .cta_bottom_section', {
            button: 'middle',
        });

        await page.waitForSelector(
            '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(2) > .navigation-link',
        );
        await page.waitForTimeout(1000);
        await page.click(
            '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(2) > .navigation-link',
            { button: 'middle' },
        );
        await page.waitForSelector(
            '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(3) > .navigation-link',
        );
        await page.waitForTimeout(1000);
        await page.click(
            '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(4) > .navigation-link',
            { button: 'middle' },
        );
        await page.waitForSelector(
            '.navigation-body > .navigation-body-section_ > .navigation-menu > .navigation-item:nth-child(3) > .navigation-link',
        );
        await page.waitForTimeout(1000);
    } catch (error) {
        console.log(error);
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
handler();
