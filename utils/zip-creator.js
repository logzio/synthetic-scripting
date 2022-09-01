const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const logger = require('./logger');

const sourceDir = path.join(__dirname, '..', 'service', 'lambdaFunction');
/**
 * @param  {string} name - Name of Lambda Function using for name of the Zip
 */
exports.fileToZip = async (name) => {
    const nameZip =
        name.split(' ').length > 0 ? name.split(' ').join('-') : name;
    const outPath = path.join(__dirname, '..', `${nameZip}.zip`);
    try {
        const archive = archiver('zip', { zlib: { level: 9 } });
        const stream = fs.createWriteStream(outPath);
        return new Promise((resolve, reject) => {
            try {
                archive
                    .directory(sourceDir, false)
                    .on('error', (err) => {
                        reject({
                            error: true,
                            err,
                        });
                    })
                    .pipe(stream);

                stream.on('close', () =>
                    resolve({ error: false, message: 'Zip Created' }),
                );
                archive.finalize();
            } catch (err) {
                logger(err);
                reject({
                    error: true,
                    err,
                });
            }
        });
    } catch (err) {
        logger(err);
        return {
            error: true,
            err,
        };
    }
};
