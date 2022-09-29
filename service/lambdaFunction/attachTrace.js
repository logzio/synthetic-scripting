/**
 * @param  {object} trace -event trace from playwright workflow
 * @param  {string} name - name of Lambda Function and name of the test
 * @param  {string} sessionId - session id for combine all test to one metric
 */
const parsingLogSynthetic = (trace, name, sessionId) => {
    const dateStartTimestamp = new Date(trace.metadata.wallTime);
    const dateEndTimestamp = new Date(
        trace.metadata.wallTime - trace.metadata.endTime,
    );

    const fullDateStart = {
        hours: dateStartTimestamp.getHours(),
        minutesStart: dateStartTimestamp.getMinutes(),
        secondsStart: dateStartTimestamp.getSeconds(),
        dayStart: dateStartTimestamp.getDay(),
        monthStart: dateStartTimestamp.getMonth(),
        fullYear: dateStartTimestamp.getFullYear(),
    };
    const fullDateEnd = {
        hours: dateEndTimestamp.getHours(),
        minutesStart: dateEndTimestamp.getMinutes(),
        secondsStart: dateEndTimestamp.getSeconds(),
        dayStart: dateEndTimestamp.getDay(),
        monthStart: dateEndTimestamp.getMonth(),
        fullYear: dateEndTimestamp.getFullYear(),
    };

    const parseObject = {
        nameTest: name,
        sessionId: sessionId,
        action: trace.metadata.method,
        duration: (
            (trace.metadata.endTime - trace.metadata.startTime) /
            1000
        ).toFixed(2),
        actionStartTime: `${fullDateStart.fullYear}/${fullDateStart.monthStart}/${fullDateStart.dayStart} - ${fullDateStart.hours}:${fullDateStart.minutesStart}:${fullDateStart.secondsStart}`,
        actionEndTime: `${fullDateEnd.fullYear}/${fullDateEnd.monthStart}/${fullDateEnd.dayStart} - ${fullDateEnd.hours}:${fullDateEnd.minutesStart}:${fullDateEnd.secondsStart}`,
        ...(trace.metadata.params
            ? {
                  actionParamatersCount: Object.keys(trace.metadata.params)
                      .length,
              }
            : {}),
        ...(trace.metadata.log
            ? { actionStepsCount: trace.metadata.log.length }
            : {}),
    };

    if (trace.metadata.params) {
        Object.keys(trace.metadata.params).forEach((key, idx) => {
            parseObject[`actionParameter${idx}_key`] = key;
            parseObject[`actionParameter${idx}_value`] =
                trace.metadata.params[key].toString();
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
