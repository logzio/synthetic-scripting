const fs = require('fs');
const path = require('path');
const { DESKTOP_DEVICE } = require('./constants');

const {
    startFileLocally,
    endFileLocally,
    startFileLocallyDeviceSelection,
} = require('../helper/index-config');
const { logger } = require('./logger');

/**
 * @param  {string} testDevice - Device where we need to run a test
 */
const populateDevice = (testDevice) => {
    const valueForReplace = 'NAME_OF_DEVICE';

    const startFileDevice = startFileLocallyDeviceSelection.replace(
        valueForReplace,
        testDevice,
    );

    return startFileDevice;
};

/**
 * @param  {string} code - Code snippet from ace editor inside Playwright test code
 * @param  {string} filePath
 */
const readWriteAsync = async (code, filePath, startFileForTest) => {
    try {
        const fileStarts = startFileForTest.split('\n');
        const IDENTIFIER_CODE = `///////////////////////////////////`;
        const fileEnds = endFileLocally.split('\n');
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
 * @param  {} code - Code snippet with user journey, built with end to end test Frameworks
 */
exports.updateFileLocal = async (code, testDevice) => {
    const statusError = {
        error: false,
        message: '',
    };
    const filePath = path.join(
        __dirname,
        '..',
        'utils',
        'lambdaFunctionLocal',
        'index.js',
    );

    try {
        let startFileForTest = startFileLocally;
        if (testDevice != DESKTOP_DEVICE) {
            startFileForTest = populateDevice(testDevice);
        }
        const fileStatus = await readWriteAsync(
            code,
            filePath,
            startFileForTest,
        );
        return fileStatus;
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
