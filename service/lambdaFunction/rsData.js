const fs = require('fs');
const convertHarToJSON = require('./convertHarToJSON');
const convertToNumber = require('./convertToNumber');
const readSendTraceData = require('./rsTraceData');
const loggerGenerator = require('./logger');
const { regionData } = require('./geolocation');
const errorStatusHandler = require('./statusError');
const createSessionId = require('./sessionId');
const createResponseStatusClass = require('./responseStatusClass');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const readSendData = async (error = '') => {
    const logger = loggerGenerator(regionData[process.env.REGION]);
    const sessionId = createSessionId();
    const status = errorStatusHandler(error);
    const harsInDir = fs.readdirSync('/tmp');

    try {
        harsInDir.forEach((file) => {
            if (file.split('.').length > 1 && file.split('.')[1] === 'har') {
                const fileData = fs.readFileSync(`/tmp/${file}`);
                const json = JSON.parse(fileData.toString());
                /*
                 * Log entries collect data for each test url,
                 * To prevent error for submitting test without url(first entry)
                 */
                if (!json.log.entries[0].request) {
                    throw new Error(
                        "The initial entry is missing. Please verify your test code and ensure that the first entry point (URL) is correctly specified. This is where you should start your end-to-end testing. For example: await page.goto('https://example.com')",
                    );
                }
                const firstEnterence = json.log.entries[0].request.url;

                const parsedData = convertHarToJSON(json);
                parsedData.result.forEach((log) => {
                    const convertedLog = convertToNumber(log);
                    logger.log({
                        ...convertedLog,
                        sessionId,
                        firstEnterence,
                        nameTest: process.env.NAME_FUNCTION,
                        ...(convertedLog.responseStatus
                            ? {
                                  responseStatusClass:
                                      createResponseStatusClass(
                                          convertedLog.responseStatus,
                                      ),
                              }
                            : {}),
                    });
                });
            }
        });

        const totalDuration = await readSendTraceData(
            process.env.NAME_FUNCTION,
            sessionId,
            logger,
        );
        console.log(process.env.NAME_FUNCTION);
        logger.log({
            testDevice: process.env.TEST_DEVICE,
            totalDuration: totalDuration,
            statusTest: status,
            statusResult: error ? 0 : 1,
            sessionId,
            nameTest: process.env.NAME_FUNCTION,
        });
        await sleep(4000);
        logger.sendAndClose();
    } catch (err) {
        console.log(err);
    }
};

module.exports = readSendData;
