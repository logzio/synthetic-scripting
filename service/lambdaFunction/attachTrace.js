const moment = require('moment'); // require

/**
 * @param  {object} trace -event trace from playwright workflow
 * @param  {string} name - name of Lambda Function and name of the test
 * @param  {string} sessionId - session id for combine all test to one metric
 * @param  {string} startTIme - Start Time from the synthetic test
 * @return parsed trace to the log
 *
 */
const parsingLogSynthetic = (trace, name, sessionId, startTime) => {
    const parseObject = {
        nameTest: name,
        sessionId: sessionId,
        action: trace.metadata.method,
        duration: (
            (trace.metadata.endTime - trace.metadata.startTime) /
            1000
        ).toFixed(2),
        actionStartTime: moment
            .unix(trace.metadata.wallTime / 1000)
            .toISOString(),
        ...(trace.metadata.params
            ? {
                  actionParamatersCount: parseInt(
                      Object.keys(trace.metadata.params).length,
                  ),
              }
            : {}),
        ...(trace.metadata.log
            ? { actionStepsCount: parseInt(trace.metadata.log.length) }
            : {}),
    };

    if (trace.metadata.params) {
        Object.keys(trace.metadata.params).forEach((key, idx) => {
            parseObject[`actionParameter${idx}_key`] = key;
            parseObject[`actionParameter${idx}_value`] = JSON.stringify(
                trace.metadata.params[key],
            );
        });
    }

    if (trace.metadata.log && trace.metadata.log.length > 0) {
        trace.metadata.log.forEach((log, idx) => {
            parseObject[`actionStep${idx}`] = log;
        });
    }

    return parseObject;
};

module.exports = parsingLogSynthetic;
