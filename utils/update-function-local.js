const fs = require('fs');
const path = require('path');
const { startFileLocally, endFileLocally } = require('../helper/index-config');

const readWriteAsync = async (code, filePath) => {
    try {
        const fileStarts = startFileLocally.split('\n');

        const fileEnds = endFileLocally.split('\n');

        const newValue = fileStarts.concat(code.split('\n'));
        const resultToWrite = newValue.concat(fileEnds).join('\n');

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, resultToWrite, 'utf-8', function (err) {
                if (err) reject(err);
                resolve({ error: false, message: 'Function created' });
            });
        });
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: err,
        };
    }
};

exports.updateFileLocal = async (code) => {
    const statusError = {
        error: false,
        message: '',
    };
    const filePath = path.join(
        __dirname,
        '..',
        'service',
        'lambdaFunctionLocal',
        'index.js',
    );

    try {
        const fileStatus = await readWriteAsync(code, filePath);
        return fileStatus;
    } catch (err) {
        console.log(err);
        statusError.error = true;
        statusError.message = err;
    }
    return statusError;
};
