const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const { DESKTOP_DEVICE } = require('./constants');
const {
    startFile,
    endFile,
    startFileDeviceSelection,
} = require('../helper/index-config');

/**
 * @param  {string} testDevice - Device where we need to run a test
 */
const populateDevice = (testDevice) => {
    const valueForReplace = 'NAME_OF_DEVICE';

    const startFileDevice = startFileDeviceSelection.replace(
        valueForReplace,
        testDevice,
    );

    return startFileDevice;
};

/**
 * @param  {string} code - Code snippet from ace editor inside Playwright test code
 * @param  {string} filePath
 */
const readWriteAsync = async (code, filePath, startFileForLambda) => {
    try {
        const fileStarts = startFileForLambda.split('\n');
        const IDENTIFIER_CODE = `///////////////////////////////////`;
        const fileEnds = endFile.split('\n');
        const extractCode = code.split(IDENTIFIER_CODE);
        const newValue = fileStarts.concat(extractCode[1].split('\n'));
        const resultToWrite = newValue.concat(fileEnds).join('\n');
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, resultToWrite, 'utf-8', function (err) {
                if (err) reject({ error: true, err });
                resolve({ error: false, message: 'Function created' });
            });
        });
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
/**
 * @param  {string} code -
 * @param  {string} testDevice - Device where we need to run a test
 */
exports.updateFile = async (code, testDevice) => {
    const filePath = path.join(
        __dirname,
        '..',
        'service',
        'lambdaFunction',
        'index.js',
    );

    try {
        let startFileForLambda = startFile;
        if (testDevice != DESKTOP_DEVICE) {
            startFileForLambda = populateDevice(testDevice);
        }
        const fileStatus = await readWriteAsync(
            code,
            filePath,
            startFileForLambda,
        );
        if (fileStatus.error) {
            throw Error(fileStatus.err);
        }
        return fileStatus;
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
