const convertToNumber = (log) => {
    const metricsToNumber = [
        'connect',
        'dns',
        'receive',
        'requestHeaderSize',
        'responseCacheControl',
        'responseContentSize',
        'responseContentLength',
        'send',
        'ssl',
        'statusResult',
        'time',
        'wait',
    ];

    const convertedLog = { ...log };

    metricsToNumber.forEach((metric) => {
        if (convertedLog[metric]) {
            if (!isNaN(parseFloat(convertedLog[metric]))) {
                convertedLog[metric] = parseFloat(convertedLog[metric]);
            } else {
                convertedLog[metric] = 0;
            }
        }
    });
    return convertedLog;
};

module.exports = convertToNumber;
