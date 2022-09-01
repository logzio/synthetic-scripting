const fs = require('fs');
const convertHarToJSON = require('./convertHarToJSON');
const loggerGenerator = require('./logger');
const errorStatusHandler = require('./statusError');
const createSessionId = require('./sessionId');
const createResponseStatusClass = require('./responseStatusClass');

const readSendData = (error = '') => {
    const logger = loggerGenerator();
    const sessionId = createSessionId();
    const status = errorStatusHandler(error);
    const harsInDir = fs.readdirSync('/tmp');

    try {
        harsInDir.forEach((file) => {
            if (file.split('.').length > 1 && file.split('.')[1] === 'har') {
                const fileData = fs.readFileSync(`/tmp/${file}`);
                const json = JSON.parse(fileData.toString());
                const firstEnterence = json.log.entries[0].request.url;

                const parsedData = convertHarToJSON(json);
                parsedData.result.forEach((log) => {
                    logger.log({
                        ...log,
                        statusTest: status,
                        statusResult: error ? 0 : 1,
                        sessionId,
                        firstEnterence,
                        nameTest: process.env.NAME_FUNCTION,
                        ...(log.responseStatus
                            ? {
                                  responseStatusClass:
                                      createResponseStatusClass(
                                          log.responseStatus,
                                      ),
                              }
                            : {}),
                    });
                });
            }
        });
        logger.sendAndClose();
    } catch (err) {
        console.log(err);
    }
};

module.exports = readSendData;
