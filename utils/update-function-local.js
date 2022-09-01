const fs = require('fs');
const path = require('path');
const { startFileLocally, endFileLocally } = require('../helper/index-config');
const { logger } = require('./logger');
/**
 * @param  {} code
 * @param  {} filePath
 */
const readWriteAsync = async (code, filePath) => {
    try {
        const fileStarts = startFileLocally.split('\n');
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
 * @param  {} code
 */
exports.updateFileLocal = async (code) => {
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
        const fileStatus = await readWriteAsync(code, filePath);
        return fileStatus;
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
