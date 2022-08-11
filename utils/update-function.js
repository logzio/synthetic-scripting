const fs = require('fs');
const path = require('path');
const { startFile, endFile } = require('../helper/index-config');
const readWriteAsync = async (code, filePath) => {
    try {
        const fileStarts = startFile.split('\n');

        const fileEnds = endFile.split('\n');

        const newValue = fileStarts.concat(code.split('\n'));
        const resultToWrite = newValue.concat(fileEnds).join('\n');
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, resultToWrite, 'utf-8', function (err) {
                if (err) reject({ error: true, err });
                resolve({ error: false, message: 'Function created' });
            });
        });
    } catch (err) {
        return {
            error: true,
            err,
        };
    }
};

exports.updateFile = async (code) => {
    const filePath = path.join(
        __dirname,
        '..',
        'service',
        'lambdaFunction',
        'index.js',
    );

    try {
        const fileStatus = await readWriteAsync(code, filePath);
        if (fileStatus.error) {
            throw Error(fileStatus.err);
        }
        return fileStatus;
    } catch (err) {
        return {
            error: true,
            err,
        };
    }
};
