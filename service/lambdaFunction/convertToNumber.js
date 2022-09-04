const convertToNumber = (log) => {
    const metricsToNumber = [
        'responseContentLength',
        'time',
        'responseContentSize',
        'requestHeaderSize',
    ];

    const convertedLog = { ...log };

    metricsToNumber.forEach((metric) => {
        if (!isNaN(parseFloat(convertedLog[metric]))) {
            convertedLog[metric] = parseFloat(convertedLog[metric]);
        }
    });
    return convertedLog;
};

module.exports = convertToNumber;
