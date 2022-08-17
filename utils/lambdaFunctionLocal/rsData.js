const fs = require('fs');
const path = require('path');
const convertHarToJSON = require('./convertHarToJSON');
const loggerGenerator = require('./logger');

const readSendData = (token) => {
    const logger = loggerGenerator(token);
    const harsInDir = fs.readdirSync('./capture-hars');

    try {
        harsInDir.forEach((file) => {
            const fileData = fs.readFileSync(path.join('./capture-hars', file));
            const json = JSON.parse(fileData.toString());
            const parsedData = convertHarToJSON(json);
            parsedData.result.forEach((log) => {
                logger.log(log);
            });
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = readSendData;
