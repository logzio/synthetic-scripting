const loggerGenerator = (regionData) => {
    return require('logzio-nodejs').createLogger({
        token: process.env.TOKEN,
        protocol: 'https',
        host: process.env.LISTENER_URL,
        port: '8071',
        type: 'synthetic-scripting', // OPTIONAL (If none is set, it will be 'nodejs')
        sendIntervalMs: 1000,
        extraFields: {
            aws_region: process.env.REGION,
            ...regionData,
        },
    });
};
module.exports = loggerGenerator;
