const fs = require('fs');
const path = require('path');
const convertHarToJSON = require('./convertHarToJSON');
const loggerGenerator = require('./logger');
const errorStatusHandler = require('./statusError');
const createSessionId = require('./sessionId');
const createResponseStatusClass = require('./responseStatusClass');

const readSendData = (token, error = '', name, listenerUrl) => {
    const sessionId = createSessionId();
    const status = errorStatusHandler(error);
    const logger = loggerGenerator(token, listenerUrl);
    const harsInDir = fs.readdirSync('./capture-hars');

    try {
        harsInDir.forEach((file) => {
            const fileData = fs.readFileSync(path.join('./capture-hars', file));
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
                    nameTest: name,
                    ...(log.responseStatus
                        ? {
                              responseStatusClass: createResponseStatusClass(
                                  log.responseStatus,
                              ),
                          }
                        : {}),
                });
            });
        });
        return true;
    } catch (err) {
        return err;
    }
};

module.exports = readSendData;
