const fs = require('fs');
const path = require('path');
const parsingLogSynthetic = require('./attachTrace');
const JSZip = require('jszip');
/**
 * @param  {string} name - name of  Lambda Function
 * @param  {string} sessionId - session id for combine all test to one metric
 * @return {number} totalDuration -  todal duration of the test
 */
const readSendTraceData = async (name, sessionId, logger) => {
    let totalDuration = 0;
    const fileContent = fs.readFileSync(
        path.join(__dirname, '..', '..', 'tmp', '/trace.zip'),
    );

    var new_zip = new JSZip();
    await new_zip
        .loadAsync(fileContent)
        .then(async (zip) => {
            // you now have every files contained in the loaded zip
            const fileCon = await zip.file('trace.trace').async('string');

            const arrNew = fileCon.split('\n');
            arrNew.forEach((line, idx) => {
                if (line.includes('"type":"action"')) {
                    const parserLog = JSON.parse(line);
                    if (parserLog.metadata.endTime) {
                        const parsedData = parsingLogSynthetic(
                            parserLog,
                            name,
                            sessionId,
                            arrNew[0].wallTime,
                        );
                        parsedData['actionCount'] = arrNew.length - 1;

                        totalDuration =
                            totalDuration + parseFloat(parsedData['duration']);
                        logger.log(parsedData);
                    }
                }
            });
        })
        .catch((err) => console.log(err));

    return totalDuration;
};
module.exports = readSendTraceData;
